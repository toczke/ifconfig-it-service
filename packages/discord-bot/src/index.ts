import { Client, Events, GatewayIntentBits, TextChannel, MessageReaction, User, EmbedBuilder, PartialMessageReaction, PartialUser, WebhookClient, Message, ThreadChannel, ThreadAutoArchiveDuration } from 'discord.js';
import { config } from 'dotenv';
import express, { Request } from 'express';
import { nanoid } from 'nanoid';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

// Load environment variables
config();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

console.log('Starting bot with configuration:', {
  channels: {
    NEW_REQUESTS: process.env.NEW_REQUESTS_CHANNEL_ID,
    IN_PROGRESS: process.env.IN_PROGRESS_CHANNEL_ID,
    DONE: process.env.DONE_CHANNEL_ID,
    REJECTED: process.env.REJECTED_CHANNEL_ID,
  },
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
  ],
});

// Express server for handling feedback forms
const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add pre-flight OPTIONS handling
app.options('*', cors());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use(express.json());

// Store feedback URLs and their associated request IDs
const feedbackUrls = new Map<string, string>();

// Store request IDs and their associated message IDs
const requestIds = new Map<string, string>();

// Discord channel IDs
const CHANNELS = {
  NEW_REQUESTS: process.env.NEW_REQUESTS_CHANNEL_ID!,
  IN_PROGRESS: process.env.IN_PROGRESS_CHANNEL_ID!,
  DONE: process.env.DONE_CHANNEL_ID!,
  REJECTED: process.env.REJECTED_CHANNEL_ID!,
};

// Reaction emojis
const REACTIONS = {
  IN_PROGRESS: '⚙️',
  REJECTED: '❌',
  DONE: '✅'
};

// Store rejected message timestamps for auto-deletion
const rejectedMessages = new Map<string, number>();

// Auto-delete rejected messages after 7 days
setInterval(async () => {
  const now = Date.now();
  for (const [messageId, timestamp] of rejectedMessages.entries()) {
    if (now - timestamp > 7 * 24 * 60 * 60 * 1000) { // 7 days
      try {
        const channel = await client.channels.fetch(CHANNELS.REJECTED) as TextChannel;
        const message = await channel.messages.fetch(messageId);
        if (message) {
          await message.delete();
          console.log(`Auto-deleted rejected message ${messageId}`);
        }
      } catch (error) {
        console.error(`Error auto-deleting message ${messageId}:`, error);
      }
      rejectedMessages.delete(messageId);
    }
  }
}, 24 * 60 * 60 * 1000); // Check every 24 hours

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  console.log('Bot is ready and listening for events');
  
  // Set bot presence
  client.user?.setPresence({
    activities: [{ name: 'IT Service Requests', type: 3 }],
    status: 'online',
  });
});

client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

client.on(Events.Warn, (warning) => {
  console.warn('Discord client warning:', warning);
});

// Handle new messages in the new requests channel
client.on(Events.MessageCreate, async (message: Message) => {
  console.log('Received message:', {
    channelId: message.channelId,
    author: message.author?.tag,
    isWebhook: !!message.webhookId,
    content: message.content || 'No content',
    embeds: message.embeds.length,
    attachments: message.attachments.size
  });

  if (message.channelId !== CHANNELS.NEW_REQUESTS) {
    console.log('Message not in target channel, ignoring');
    return;
  }
  
  // Skip if the message is from a bot (except webhooks)
  if (message.author?.bot && !message.webhookId) {
    console.log('Message from bot (not webhook), ignoring');
    return;
  }

  try {
    // Handle webhook messages
    if (message.webhookId) {
      console.log('Processing webhook message');
      
      // Create a formatted embed for the request
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTimestamp();

      let formattedContent = '';
      let serviceType = '';
      let attachments: { attachment: string; name: string }[] = [];

      // Handle both embed and text content
      if (message.embeds.length > 0) {
        // If the message has an embed, use its content
        const originalEmbed = message.embeds[0];
        console.log('Original embed:', originalEmbed);

        // Extract content from the embed
        if (originalEmbed.description) {
          formattedContent = originalEmbed.description;
        } else if (originalEmbed.fields) {
          formattedContent = originalEmbed.fields.map(field => 
            `**${field.name}**\n${field.value}`
          ).join('\n\n');
        } else if (originalEmbed.title) {
          formattedContent = originalEmbed.title;
        }

        // Handle image from embed if present
        if (originalEmbed.image) {
          attachments.push({
            attachment: originalEmbed.image.url,
            name: 'image.png'
          });
        }
      } else if (message.content) {
        // If the message has text content, use that
        const lines = message.content.split('\n');
        let currentSection = '';
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          // Skip timestamp line
          if (trimmedLine.startsWith('Dziś o')) continue;

          // Check if this is a section header
          if (trimmedLine === 'Imię' || 
              trimmedLine === 'Email' || 
              trimmedLine === 'Telefon' || 
              trimmedLine === 'Typ usługi' || 
              trimmedLine === 'Model urządzenia' || 
              trimmedLine === 'Wiadomość') {
            currentSection = trimmedLine;
            formattedContent += `\n**${currentSection}**\n`;
          } else {
            // This is a value line
            if (currentSection === 'Typ usługi') {
              serviceType = trimmedLine;
            }
            formattedContent += trimmedLine + '\n';
          }
        }
      }

      // Handle attachments from the message
      if (message.attachments.size > 0) {
        const attachmentArray = Array.from(message.attachments.values());
        attachments = attachmentArray.map(att => ({
          attachment: att.url,
          name: att.name
        }));
      }

      // Set the title based on service type
      if (serviceType) {
        switch (serviceType.toLowerCase()) {
          case 'naprawa sprzętu':
            embed.setTitle('🔧 Naprawa Sprzętu');
            break;
          case 'składanie pc':
            embed.setTitle('💻 Składanie PC');
            break;
          case 'instalacja oprogramowania':
            embed.setTitle('📦 Instalacja Oprogramowania');
            break;
          case 'konfiguracja sieci':
            embed.setTitle('🌐 Konfiguracja Sieci');
            break;
          case 'inne':
            embed.setTitle('📝 Inne Zlecenie');
            break;
          default:
            embed.setTitle('📝 Nowe Zlecenie');
        }
      } else {
        embed.setTitle('📝 Nowe Zlecenie');
      }

      // Set the formatted content as description
      if (formattedContent.trim()) {
        embed.setDescription(formattedContent.trim());
      } else {
        console.error('No content found in webhook message');
        // Set a default description if no content is found
        embed.setDescription('Brak szczegółów zlecenia');
      }

      // Delete the original webhook message first
      console.log('Deleting original webhook message');
      await message.delete().catch(console.error);

      // Send the formatted message with attachments
      console.log('Sending formatted message');
      const channel = message.channel as TextChannel;
      const formattedMessage = await channel.send({ 
        embeds: [embed],
        files: attachments
      });
      
      // Add reaction buttons to the formatted message
      console.log('Adding reaction buttons');
      await formattedMessage.react(REACTIONS.IN_PROGRESS);
      await formattedMessage.react(REACTIONS.REJECTED);
    } else {
      // Handle regular messages
      const embed = new EmbedBuilder()
        .setTitle('📝 Nowe Zlecenie')
        .setDescription(message.content || 'Brak szczegółów zlecenia')
        .setColor('#0099ff')
        .setTimestamp();

      const channel = message.channel as TextChannel;
      const formattedMessage = await channel.send({ embeds: [embed] });
      await formattedMessage.react(REACTIONS.IN_PROGRESS);
      await formattedMessage.react(REACTIONS.REJECTED);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    // Try to send an error message to the channel
    try {
      const channel = message.channel as TextChannel;
      await channel.send('Sorry, there was an error processing this request. Please try again later.');
    } catch (sendError) {
      console.error('Error sending error message:', sendError);
    }
  }

  // Test command
  if (message.content === '!test') {
    try {
      console.log('Test command received');
      await message.reply('Bot is working! 🎉');
      console.log('Test command response sent');
    } catch (error) {
      console.error('Error sending test response:', error);
    }
  }

  // Handle thread replies
  if (message.channel.isThread()) {
    try {
      const thread = message.channel as ThreadChannel;
      const parentMessage = await thread.parent?.fetch() as unknown as Message;
      if (!parentMessage) return;

      // Get the original embed
      const originalEmbed = parentMessage.embeds[0];
      if (!originalEmbed) return;

      // Create new embed with updated service note
      const embed = new EmbedBuilder()
        .setTitle(originalEmbed.title || 'Service Request')
        .setDescription(originalEmbed.description || '')
        .setColor(originalEmbed.color || '#0099ff')
        .setTimestamp();

      // Copy over any additional fields from the original embed
      if (originalEmbed.fields) {
        embed.addFields(originalEmbed.fields);
      }

      // Update or add service note field
      const serviceNoteField = originalEmbed.fields?.find((field: { name: string }) => field.name === '📝 Notatka serwisu');
      if (serviceNoteField) {
        embed.spliceFields(0, 1, { 
          name: '📝 Notatka serwisu', 
          value: `[Otwórz wątek](${thread.url})` 
        });
      } else {
        embed.addFields({ 
          name: '📝 Notatka serwisu', 
          value: `[Otwórz wątek](${thread.url})` 
        });
      }

      // Update the parent message
      await parentMessage.edit({ embeds: [embed] });
    } catch (error) {
      console.error('Error handling thread reply:', error);
    }
  }
});

// Handle reactions
client.on(Events.MessageReactionAdd, async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
  console.log('Received reaction:', {
    emoji: reaction.emoji.name,
    userId: user.id,
    isBot: user.bot
  });

  if (user.bot) {
    console.log('Reaction from bot, ignoring');
    return;
  }

  try {
    // Fetch the full message if it's a partial reaction
    const message = reaction.message.partial ? await reaction.message.fetch() : reaction.message;
    const channel = message.channel as TextChannel;

    // Handle reactions only in the new requests, in progress, and rejected channels
    if (channel.id !== CHANNELS.NEW_REQUESTS && 
        channel.id !== CHANNELS.IN_PROGRESS && 
        channel.id !== CHANNELS.REJECTED) {
      console.log('Reaction not in target channel, ignoring');
      return;
    }

    console.log('Processing reaction in target channel');

    // Remove all reactions from the message
    await message.reactions.removeAll();

    // Get the original embed
    const originalEmbed = message.embeds[0];
    if (!originalEmbed) {
      console.log('No embed found in message, ignoring');
      return;
    }

    // Create new embed based on the original
    const embed = new EmbedBuilder()
      .setTitle(originalEmbed.title || 'Service Request')
      .setDescription(originalEmbed.description || '')
      .setColor('#0099ff')
      .setTimestamp();

    // Copy over any additional fields from the original embed
    if (originalEmbed.fields) {
      embed.addFields(originalEmbed.fields);
    }

    // Handle different reactions based on the channel
    if (channel.id === CHANNELS.NEW_REQUESTS) {
      // Handle reactions in NEW_REQUESTS channel
      switch (reaction.emoji.name) {
        case REACTIONS.IN_PROGRESS:
          console.log('Moving request to In Progress');
          embed.setColor('#ffa500');
          embed.setTitle('⚙️ Zlecenie w trakcie');
          const inProgressMessage = await moveMessage(message, CHANNELS.IN_PROGRESS, embed);
          // Add only the done reaction for in-progress state
          await inProgressMessage.react(REACTIONS.DONE);
          break;

        case REACTIONS.REJECTED:
          console.log('Moving request to Rejected');
          embed.setColor('#ff0000');
          embed.setTitle('❌ Zlecenie odrzucone');
          const rejectedMessage = await moveMessage(message, CHANNELS.REJECTED, embed);
          // Add the in-progress reaction to allow moving back
          await rejectedMessage.react(REACTIONS.IN_PROGRESS);
          // Store timestamp for auto-deletion
          rejectedMessages.set(rejectedMessage.id, Date.now());
          break;
      }
    } else if (channel.id === CHANNELS.IN_PROGRESS) {
      // Handle reactions in IN_PROGRESS channel
      if (reaction.emoji.name === REACTIONS.DONE) {
        console.log('Moving request to Done');
        embed.setColor('#00ff00');
        embed.setTitle('✅ Zlecenie zakończone');
        await moveMessage(message, CHANNELS.DONE, embed);
      }
    } else if (channel.id === CHANNELS.REJECTED) {
      // Handle reactions in REJECTED channel
      if (reaction.emoji.name === REACTIONS.IN_PROGRESS) {
        console.log('Moving request back to In Progress');
        embed.setColor('#ffa500');
        embed.setTitle('⚙️ Zlecenie w trakcie');
        const inProgressMessage = await moveMessage(message, CHANNELS.IN_PROGRESS, embed);
        // Add only the done reaction for in-progress state
        await inProgressMessage.react(REACTIONS.DONE);
        // Remove from auto-deletion list
        rejectedMessages.delete(message.id);
      }
    }
  } catch (error) {
    console.error('Error processing reaction:', error);
  }
});

// Handle thread creation and replies
client.on(Events.ThreadCreate, async (thread: ThreadChannel) => {
  try {
    console.log('Thread created:', {
      threadId: thread.id,
      parentMessageId: thread.parentId,
      channelId: thread.parentId
    });

    // Only handle threads in service channels
    const parentMessage = await thread.parent?.fetch() as unknown as Message;
    if (!parentMessage) return;

    // Get the original embed
    const originalEmbed = parentMessage.embeds[0];
    if (!originalEmbed) return;

    // Create new embed with service note
    const embed = new EmbedBuilder()
      .setTitle(originalEmbed.title || 'Service Request')
      .setDescription(originalEmbed.description || '')
      .setColor(originalEmbed.color || '#0099ff')
      .setTimestamp();

    // Copy over any additional fields from the original embed
    if (originalEmbed.fields) {
      embed.addFields(originalEmbed.fields);
    }

    // Add service note field
    embed.addFields({ 
      name: '📝 Notatka serwisu', 
      value: `[Otwórz wątek](${thread.url})` 
    });

    // Update the parent message
    await parentMessage.edit({ embeds: [embed] });
  } catch (error) {
    console.error('Error handling thread creation:', error);
  }
});

async function moveMessage(message: Message, targetChannelId: string, embed: EmbedBuilder): Promise<Message> {
  try {
    console.log(`Moving message to channel ${targetChannelId}`);
    const targetChannel = await client.channels.fetch(targetChannelId) as TextChannel;
    if (!targetChannel) {
      throw new Error(`Channel ${targetChannelId} not found`);
    }
    const newMessage = await targetChannel.send({ embeds: [embed] });
    await message.delete();
    console.log('Message moved successfully');
    return newMessage;
  } catch (error) {
    console.error('Error moving message:', error);
    throw error;
  }
}

async function generateFeedbackUrl(requestId: string): Promise<string> {
  const uniqueId = nanoid();
  feedbackUrls.set(uniqueId, requestId);
  
  // Replace with your actual frontend URL
  return `${process.env.FRONTEND_URL}/feedback/${uniqueId}`;
}

// Feedback endpoint
app.post('/feedback/:feedbackId', async (req, res) => {
  const { feedbackId } = req.params;
  const { rating, comment } = req.body;

  const requestId = feedbackUrls.get(feedbackId);
  if (!requestId) {
    return res.status(404).json({ error: 'Feedback ID not found' });
  }

  try {
    // Here you would typically save the feedback to your database
    console.log(`Feedback received for request ${requestId}:`, { rating, comment });
    
    // Remove the feedback URL after submission
    feedbackUrls.delete(feedbackId);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// Generate a unique request ID
function generateRequestId(): string {
  return Math.floor(Math.random() * 10000).toString();
}

// Contact form endpoint
app.post('/contact', upload.single('photo'), async (req: Request & { file?: Express.Multer.File }, res) => {
  try {
    console.log('Received contact form submission');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    let data;
    if (req.file) {
      console.log('Parsing data from form data');
      data = JSON.parse(req.body.data);
    } else {
      console.log('Using data directly from request body');
      data = req.body;
    }

    console.log('Parsed data:', data);

    const { name, email, phone, serviceType, deviceModel, message } = data;
    
    if (!name || !email || !phone || !serviceType || !message) {
      console.error('Missing required fields:', { name, email, phone, serviceType, message });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate a unique request ID
    const requestId = generateRequestId();

    // Create a formatted embed for the request
    const embed = new EmbedBuilder()
      .setTitle('📝 Nowe Zlecenie')
      .setColor('#0099ff')
      .setTimestamp();

    // Format the content
    const formattedContent = `**${serviceType}**

**👤 Dane kontaktowe**
Imię: ${name}
Email: ${email}
Telefon: ${phone}

**💻 Szczegóły urządzenia**
Model: ${deviceModel || 'Nie podano'}

**📝 Wiadomość**
${message}

**🔗 Link do śledzenia**
${process.env.FRONTEND_URL}/job/${requestId}`;

    embed.setDescription(formattedContent);

    // Send the message to Discord
    console.log('Fetching Discord channel');
    const channel = await client.channels.fetch(CHANNELS.NEW_REQUESTS) as TextChannel;
    
    let formattedMessage;
    // If there's a photo, attach it to the message
    if (req.file) {
      console.log('Sending message with photo');
      formattedMessage = await channel.send({ 
        embeds: [embed],
        files: [{
          attachment: req.file.path,
          name: req.file.originalname
        }]
      });
    } else {
      console.log('Sending message without photo');
      formattedMessage = await channel.send({ embeds: [embed] });
    }
    
    // Store the request ID and message ID mapping
    requestIds.set(requestId, formattedMessage.id);
    
    // Add reaction buttons
    console.log('Adding reaction buttons');
    await formattedMessage.react(REACTIONS.IN_PROGRESS);
    await formattedMessage.react(REACTIONS.DONE);
    await formattedMessage.react(REACTIONS.REJECTED);

    console.log('Contact form processed successfully');
    res.json({ 
      success: true,
      requestId,
      trackingUrl: `${process.env.FRONTEND_URL}/job/${requestId}`
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// Endpoint to get request status
app.get('/api/request/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const messageId = requestIds.get(requestId);

    if (!messageId) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Search for the message in all service channels
    const channels = [CHANNELS.NEW_REQUESTS, CHANNELS.IN_PROGRESS, CHANNELS.DONE, CHANNELS.REJECTED];
    let message = null;
    let foundChannelId = null;

    for (const channelId of channels) {
      const channel = await client.channels.fetch(channelId) as TextChannel;
      try {
        message = await channel.messages.fetch(messageId);
        if (message) {
          foundChannelId = channelId;
          break;
        }
      } catch (error) {
        // Message not found in this channel, continue searching
        continue;
      }
    }

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const embed = message.embeds[0];
    if (!embed) {
      return res.status(404).json({ error: 'Embed not found' });
    }

    // Get thread messages if they exist
    let threadMessages: Array<{
      content: string;
      author: string;
      timestamp: Date;
      isBot: boolean;
    }> = [];

    if (message.thread) {
      const thread = await message.thread.fetch();
      const messages = await thread.messages.fetch();
      threadMessages = messages.map(msg => ({
        content: msg.content,
        author: msg.author.tag,
        timestamp: msg.createdAt,
        isBot: msg.author.bot
      }));
    }

    res.json({
      status: foundChannelId,
      title: embed.title,
      description: embed.description,
      color: embed.color,
      timestamp: embed.timestamp,
      threadMessages
    });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Failed to fetch request status' });
  }
});

// Start Express server for handling feedback
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Feedback server running on port ${PORT}`);
});

// Start the Discord bot
client.login(process.env.DISCORD_TOKEN); 
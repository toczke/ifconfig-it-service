interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  deviceModel?: string;
  photo?: File | null;
}

export async function sendToDiscord(data: ContactFormData): Promise<boolean> {
  try {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('Discord webhook URL not found in environment variables');
    }

    // Create the message content
    const messageContent = {
      embeds: [{
        title: '📝 Nowa wiadomość z formularza kontaktowego',
        color: 0x00ff00, // Green color
        description: `**${data.serviceType || 'Nie określono typu usługi'}**`,
        fields: [
          {
            name: '👤 Dane kontaktowe',
            value: `**Imię:** ${data.name}\n**Email:** \`${data.email}\`\n**Telefon:** \`${data.phone}\``,
            inline: false
          },
          {
            name: '💻 Szczegóły urządzenia',
            value: data.deviceModel ? `**Model:** ${data.deviceModel}` : 'Nie podano modelu urządzenia',
            inline: false
          },
          {
            name: '📝 Wiadomość',
            value: data.message || 'Brak wiadomości',
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'IT Service - Formularz kontaktowy'
        }
      }]
    };

    // If there's a photo, we'll need to handle it differently
    if (data.photo) {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('file', data.photo, data.photo.name);
      formData.append('payload_json', JSON.stringify(messageContent));

      // Send the message with file to Discord
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      return true;
    } else {
      // Send message without file
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageContent),
      });

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      return true;
    }
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return false;
  }
} 
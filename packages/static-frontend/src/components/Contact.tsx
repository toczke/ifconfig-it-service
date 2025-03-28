import { useState } from 'react';
import { Container, Title, Text, TextInput, Textarea, Button, Group, Select, Notification, Grid, Paper, Alert } from '@mantine/core';
import { IconUser, IconAt, IconPhone, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import classes from './Contact.module.css';

interface DiscordEmbed {
  title: string;
  color: number;
  fields: {
    name: string;
    value: string;
    inline: boolean;
  }[];
  timestamp: string;
}

interface DiscordWebhookMessage {
  embeds: DiscordEmbed[];
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      deviceModel: '',
      message: '',
    },
    validate: {
      name: (value) => (!value ? 'Imię jest wymagane' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Nieprawidłowy email'),
      phone: (value) => {
        if (!value) return 'Telefon jest wymagany';
        const cleanPhone = value.replace(/\D/g, '');
        const phoneRegex = /^(\+48|48)?[0-9]{9}$/;
        return phoneRegex.test(cleanPhone) ? null : 'Nieprawidłowy numer telefonu';
      },
      serviceType: (value) => (!value ? 'Wybierz typ usługi' : null),
      message: (value) => (!value ? 'Wiadomość jest wymagana' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
      
      const discordMessage: DiscordWebhookMessage = {
        embeds: [{
          title: 'Nowe zgłoszenie serwisowe',
          color: 0x00ff00,
          fields: [
            {
              name: 'Imię',
              value: form.values.name,
              inline: true
            },
            {
              name: 'Email',
              value: form.values.email,
              inline: true
            },
            {
              name: 'Telefon',
              value: form.values.phone,
              inline: true
            },
            {
              name: 'Typ usługi',
              value: form.values.serviceType,
              inline: true
            },
            {
              name: 'Model urządzenia',
              value: form.values.deviceModel || 'Nie podano',
              inline: true
            },
            {
              name: 'Wiadomość',
              value: form.values.message,
              inline: false
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message to Discord');
      }

      setShowSuccess(true);
      form.reset();
    } catch (err) {
      setShowError(true);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl" id="kontakt" className={classes.wrapper}>
      <Title order={2} className={classes.title} ta="center">
        Skontaktuj się z nami
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Wypełnij formularz, a odpowiemy najszybciej jak to możliwe.
      </Text>

      <Grid gutter="xl" mt="xl">
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder h="100%" className={classes.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2324.1234567890123!2d18.612601428270686!3d54.30110273268977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0a0a0a0a0a0a%3A0x0!2zNTVCsDE4JzA0LjAiTiAxOMKwMzYnNDUuNCJF!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: 'var(--mantine-radius-md)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja firmy"
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Imię"
                placeholder="Imię"
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('name')}
                required
              />

              <TextInput
                label="Email"
                placeholder="imię@twójmail.pl"
                leftSection={<IconAt size={16} />}
                {...form.getInputProps('email')}
                required
              />

              <TextInput
                label="Telefon"
                placeholder="123 456 789"
                leftSection={<IconPhone size={16} />}
                {...form.getInputProps('phone')}
                required
              />

              <Select
                label="Typ usługi"
                placeholder="Wybierz typ usługi"
                data={[
                  { value: 'Naprawa komputera', label: 'Naprawa komputera' },
                  { value: 'Naprawa laptopa', label: 'Naprawa laptopa' },
                  { value: 'Składanie PC', label: 'Składanie PC' },
                  { value: 'Pomoc w wyborze', label: 'Pomoc w wyborze konfiguracji' },
                  { value: 'Inne', label: 'Inne' },
                ]}
                {...form.getInputProps('serviceType')}
                required
              />

              <TextInput
                label="Model urządzenia (opcjonalnie)"
                placeholder="np. Dell XPS 13, Lenovo ThinkPad T14"
                {...form.getInputProps('deviceModel')}
              />

              <Textarea
                label="Wiadomość"
                placeholder="Opisz szczegółowo problem lub zapytanie"
                minRows={4}
                {...form.getInputProps('message')}
                required
              />

              <Group justify="center" mt="md">
                <Button 
                  type="submit" 
                  loading={loading}
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
                  size="md"
                  fullWidth
                >
                  Wyślij wiadomość
                </Button>
              </Group>
            </form>

            {showSuccess && (
              <Alert
                title="Sukces!"
                color="green"
                variant="filled"
                onClose={() => setShowSuccess(false)}
              >
                <Text>Twoja wiadomość została wysłana pomyślnie.</Text>
              </Alert>
            )}

            {showError && (
              <Notification
                icon={<IconX size={20} />}
                color="red"
                title="Błąd!"
                mt="md"
                onClose={() => setShowError(false)}
              >
                Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.
              </Notification>
            )}

            <Group justify="center" mt="md">
              <Button 
                variant="light" 
                color="red" 
                leftSection={<IconPhone size={16} />}
                onClick={() => window.location.href = "tel:+48792172936"}
                size="md"
                fullWidth
              >
                Pilny przypadek? Zadzwoń do nas!
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

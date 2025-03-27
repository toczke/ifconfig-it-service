import { 
  TextInput, 
  Textarea, 
  Button, 
  Container, 
  Title, 
  Text, 
  Group, 
  Box, 
  Notification,
  Select,
  FileInput 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX, IconAt, IconPhone, IconUser, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './Contact.module.css';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const serviceTypes = [
    { value: 'laptop', label: 'Naprawa Laptopa' },
    { value: 'desktop', label: 'Naprawa Komputera' },
    { value: 'software', label: 'Problem z Oprogramowaniem' },
    { value: 'custompc', label: 'Budowa PC/Sprzęt' },
    { value: 'other', label: 'Inne' },
  ];

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      serviceType: '',
      photo: null as File | null
    },
    validate: {
      name: (value) => {
        if (!value) return 'Imię jest wymagane';
        if (value.length < 2) return 'Imię jest zbyt krótkie (min. 2 znaki)';
        if (value.length > 50) return 'Imię jest zbyt długie (max 50 znaków)';
        return null;
      },
      email: (value) => {
        if (!value) return 'Email jest wymagany';
        if (!/^\S+@\S+$/.test(value)) return 'Nieprawidłowy format email';
        return null;
      },
      phone: (value) => {
        if (!value) return 'Numer telefonu jest wymagany';
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 9) return 'Numer jest zbyt krótki (min. 9 cyfr)';
        if (cleaned.length > 15) return 'Numer jest zbyt długi (max 15 cyfr)';
        if (!/^[0-9+ ]+$/.test(value)) return 'Tylko cyfry, spacje i + są dozwolone';
        return null;
      },
      message: (value) => {
        if (!value) return 'Wiadomość jest wymagana';
        if (value.length < 10) return 'Wiadomość jest zbyt krótka (min. 10 znaków)';
        if (value.length > 1000) return 'Wiadomość jest zbyt długa (max 1000 znaków)';
        return null;
      },
      photo: (value) => {
        if (value) {
          // Check file size (max 5MB)
          if (value.size > 5 * 1024 * 1024) return 'Plik jest zbyt duży (max 5MB)';
          // Check file type
          const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!validTypes.includes(value.type)) return 'Nieprawidłowy typ pliku (akceptowane: JPG, PNG, GIF)';
        }
        return null;
      }
    },
    validateInputOnBlur: true,
  });

  const sendToDiscord = async (values: typeof form.values) => {
    setLoading(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';

      const selectedService = serviceTypes.find(type => type.value === values.serviceType)?.label || values.serviceType || 'Nie wybrano';

      // Create form data to handle file upload
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('message', values.message);
      formData.append('serviceType', selectedService);
      if (values.photo) {
        formData.append('photo', values.photo);
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setShowSuccess(true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending to Discord:', error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^\d+ ]/g, '');
    form.setFieldValue('phone', cleaned);
  };

  return (
    <Container size="md" py="xl" id="kontakt" className={classes.wrapper}>
      <Title order={2} className={classes.title} ta="center">
        Skontaktuj się z nami
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Wypełnij formularz, a odpowiemy najszybciej jak to możliwe
      </Text>

      <Box maw={600} mx="auto" mt="xl">
        <form onSubmit={form.onSubmit(sendToDiscord)}>
          <TextInput
            label="Imię"
            placeholder="Twoje imię"
            required
            leftSection={<IconUser size={16} />}
            {...form.getInputProps('name')}
            errorProps={{ style: { whiteSpace: 'pre-wrap' } }}
          />

          <TextInput
            label="Email"
            placeholder="twój@email.com"
            required
            leftSection={<IconAt size={16} />}
            mt="md"
            {...form.getInputProps('email')}
            errorProps={{ style: { whiteSpace: 'pre-wrap' } }}
          />

          <TextInput
            label="Telefon"
            placeholder="123 456 789 lub +48 123 456 789"
            required
            leftSection={<IconPhone size={16} />}
            mt="md"
            value={form.values.phone}
            onChange={handlePhoneChange}
            onBlur={() => form.validateField('phone')}
            error={form.errors.phone}
            errorProps={{ style: { whiteSpace: 'pre-wrap' } }}
          />

          <Select
            label="Typ usługi (opcjonalne)"
            placeholder="Wybierz kategorię"
            data={serviceTypes}
            mt="md"
            clearable
            {...form.getInputProps('serviceType')}
          />

          <Textarea
            label="Wiadomość"
            placeholder="Opisz swój problem lub zapytanie"
            required
            minRows={4}
            mt="md"
            {...form.getInputProps('message')}
            errorProps={{ style: { whiteSpace: 'pre-wrap' } }}
          />

          <FileInput
            label="Zdjęcie problemu (opcjonalne)"
            placeholder="Kliknij aby dodać zdjęcie"
            accept="image/png,image/jpeg,image/gif"
            leftSection={<IconPhoto size={16} />}
            mt="md"
            clearable
            {...form.getInputProps('photo')}
            errorProps={{ style: { whiteSpace: 'pre-wrap' } }}
          />
          <Text size="xs" c="dimmed" mt={4}>
            Maksymalny rozmiar pliku: 5MB (JPG, PNG, GIF)
          </Text>

          <Group justify="center" mt="xl">
            <Button 
              type="submit" 
              size="md"
              loading={loading}
              disabled={!form.isValid()}
            >
              Wyślij wiadomość
            </Button>
          </Group>
        </form>

        {showSuccess && (
          <Notification
            icon={<IconCheck size={20} />}
            color="teal"
            title="Wysłano!"
            mt="md"
            onClose={() => setShowSuccess(false)}
          >
            Twoja wiadomość została wysłana. Skontaktujemy się wkrótce!
          </Notification>
        )}

        {showError && (
          <Notification
            icon={<IconX size={20} />}
            color="red"
            title="Błąd!"
            mt="md"
            onClose={() => setShowError(false)}
          >
            Wystąpił błąd podczas wysyłania. Spróbuj ponownie później.
          </Notification>
        )}

        {/* Urgent case button */}
        <Group justify="center" mt="xl">
          <Button 
            variant="light" 
            color="red" 
            leftSection={<IconPhone size={16} />}
            onClick={() => window.location.href = "tel:+48792172936"} // Dials the phone number
          >
            Pilny przypadek? Zadzwoń do nas
          </Button>
        </Group>
      </Box>
    </Container>
  );
}

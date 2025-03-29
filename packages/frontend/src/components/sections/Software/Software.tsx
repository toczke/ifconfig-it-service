import { 
    IconCode, 
    IconShieldLock, 
    IconDatabase, 
    IconCloud,
    IconSettings,
    IconAntennaBars5
  } from '@tabler/icons-react';
  import { Grid, SimpleGrid, Text, ThemeIcon, Title, Container } from '@mantine/core';
  import classes from './Software.module.css';
  
  const services = [
    {
      icon: IconShieldLock,
      title: 'Usuwanie Wirusów',
      description: 'Kompleksowe czyszczenie systemu z malware i wirusów',
    },
    {
      icon: IconSettings,
      title: 'Optymalizacja Systemu',
      description: 'Przyspieszenie działania Windows/macOS/Linux',
    },
    {
      icon: IconDatabase,
      title: 'Odzyskiwanie Danych',
      description: 'Ratowanie utraconych plików i dokumentów',
    },
    {
      icon: IconCloud,
      title: 'Konfiguracja Chmury',
      description: 'Ustawienie synchronizacji z usługami cloud',
    },
    {
      icon: IconCode,
      title: 'Instalacja Oprogramowania',
      description: 'Profesjonalna instalacja i konfiguracja programów',
    },
    {
      icon: IconAntennaBars5,
      title: 'Problemy Sieciowe',
      description: 'Rozwiązywanie problemów z połączeniem internetowym',
    },
  ];
  
  export function Software() {
    const items = services.map((service, index) => (
      <div key={index} className={classes.item}>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: 'green', to: 'cyan' }} // Different color for software
        >
          <service.icon size={26} stroke={1.5} />
        </ThemeIcon>
        <Text fz="lg" mt="sm" fw={500}>
          {service.title}
        </Text>
        <Text c="dimmed" fz="sm">
          {service.description}
        </Text>
      </div>
    ));
  
    return (
      <Container size="lg" py="xl" className={classes.wrapper}>
        <Grid gutter={80}>
          {/* Services list now on LEFT side (span 7) */}
          <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
  
          {/* Description now on RIGHT side (span 5) */}
          <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
            <Title className={classes.title} order={2}>
              Usługi Software'owe
            </Title>
            <Text c="dimmed">
              Problemy z systemem? A może sieć płata figle? Spokojnie, zajmiemy się tym.
            </Text>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
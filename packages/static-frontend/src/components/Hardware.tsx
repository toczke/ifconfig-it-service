import { 
    IconDeviceLaptop, 
    IconCloudComputing,
    IconBrush,
    IconProgress
  } from '@tabler/icons-react';
  import { Grid, SimpleGrid, Text, ThemeIcon, Title, Container } from '@mantine/core';
  import classes from './Hardware.module.css';
  
  const services = [
    {
      icon: IconDeviceLaptop,
      title: 'Naprawy Laptopów',
      description: 'Kompleksowa naprawa laptopów wszystkich marek',
    },
    {
      icon: IconCloudComputing,
      title: 'Modernizacja PC',
      description: 'Wymiana procesorów, kart graficznych i dysków',
    },
    {
      icon: IconBrush,
      title: 'Czyszczenie',
      description: 'Profesjonalne czyszczenie układów chłodzenia',
    },
    {
      icon: IconProgress,
      title: 'Instalacja oprogramowania',
      description: 'Zainstalujemy Twoje oprogramowanie',
    },
  ];
  
  export function Hardware() {
    const items = services.map((service, index) => (
      <div key={index} className={classes.item}>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
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
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Title className={classes.title} order={2}>
              Profesjonalne Usługi Serwisowe
            </Title>
            <Text c="dimmed">
              Oferujemy kompleksowe naprawy sprzętu komputerowego z gwarancją jakości.
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
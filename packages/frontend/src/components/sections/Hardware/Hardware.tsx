import { 
  IconDeviceLaptop, 
  IconBrush,
  IconProgress,
  IconDeviceDesktop,
  IconArrowUp,
  IconCpu
} from '@tabler/icons-react';
import { Grid, SimpleGrid, Text, ThemeIcon, Title, Container } from '@mantine/core';
import classes from './Hardware.module.css';

const services = [
{
  icon: IconDeviceDesktop,
  title: 'Zepsuty komputer?',
  description: 'Naprawiamy komputer – każda awaria, każde urządzenie.',
},
{
  icon: IconArrowUp,
  title: 'Modernizacja jednostki?',
  description: 'Wymiana procesora, karty graficznej, dysku – popraw wydajność.',
},
{
  icon: IconDeviceLaptop,
  title: 'Naprawa laptopa?',
  description: 'Naprawiamy laptopy - szybko, sprawnie i tanio.',
},
{
  icon: IconBrush,
  title: 'Wysokie temperatury?',
  description: 'Czyszczenie i konserwacja układu chłodzenia – dla optymalnej pracy.',
},
{
  icon: IconProgress,
  title: 'Software',
  description: 'Instalacja i konfiguracja oprogramowania do Twoich potrzeb.',
},
{
  icon: IconCpu,
  title: 'PC na Zamówienie',
  description: 'Komputer stworzony pod Twoje wymagania – moc i wydajność.',
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
          Naprawiam komputery i laptopy. Szybko, skutecznie i bez zbędnych formalności. Każda naprawa to gwarancja jakości i terminowości.
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

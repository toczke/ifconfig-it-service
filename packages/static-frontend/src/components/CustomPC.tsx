import { 
  IconCpu, 
  IconKeyboard,
  IconDeviceDesktop
} from '@tabler/icons-react';
import { FaMemory } from "react-icons/fa";
import { BsGpuCard, BsDeviceSsd, BsFan } from "react-icons/bs";
import { 
  Grid, 
  SimpleGrid, 
  Text, 
  ThemeIcon, 
  Title, 
  Container, 
  Badge, 
  Group,
  Button
} from '@mantine/core';
import classes from './CustomPC.module.css';

const services = [
  {
    icon: IconCpu,
    title: 'Dobór Procesora',
    description: 'Optymalny wybór CPU do Twoich potrzeb',
    badges: ['Intel', 'AMD']
  },
  {
    icon: BsGpuCard,
    title: 'Karty Graficzne',
    description: 'Dopasowanie GPU do gier i aplikacji',
    badges: ['NVIDIA', 'AMD', 'Intel']
  },
  {
    icon: FaMemory,
    title: 'Pamięć RAM',
    description: 'Konfiguracja pod kątem wydajności',
    badges: ['DDR4', 'DDR5']
  },
  {
    icon: BsDeviceSsd,
    title: 'Dyski i SSD',
    description: 'Optymalne rozwiązania pamięci masowej',
    badges: ['NVMe', 'SATA']
  },
  {
    icon: BsFan,
    title: 'Chłodzenie',
    description: 'Ciche i efektywne systemy chłodzenia',
    badges: ['Powietrzne', 'Wodne']
  },
  {
    icon: IconKeyboard,
    title: 'Konfiguracja',
    description: 'Profesjonalny montaż i optymalizacja',
    badges: ['OC', 'Testy']
  },
];

export function CustomPC() {
  const items = services.map((service, index) => (
    <div key={index} className={classes.item}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'teal', to: 'blue' }}
        className={classes.serviceIcon}
      >
        <service.icon size={26} stroke="1.5" />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500} className={classes.serviceTitle}>
        {service.title}
      </Text>
      <Text c="dimmed" fz="sm" className={classes.serviceDescription}>
        {service.description}
      </Text>
      <Group gap="sm" mt="xs" className={classes.badgeGroup}>
        {service.badges.map((badge, i) => (
          <Badge key={i} variant="light" color="blue" className={classes.serviceBadge}>
            {badge}
          </Badge>
        ))}
      </Group>
    </div>
  ));

  return (
    <Container size="lg" py="xl" className={classes.wrapper} id="custompc">
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <div className={classes.headerContent}>
            <ThemeIcon
              size={44}
              radius="md"
              variant="light"
              color="blue"
              mb="md"
            >
              <IconDeviceDesktop size={26} />
            </ThemeIcon>
            <Title className={classes.title} order={2}>
              Profesjonalne Składanie PC – Twój Komputer, Twoje Zwycięstwo
            </Title>
            <Text c="dimmed" className={classes.description}>
              Chcesz pograć w najnowsze gry, ale nie wiesz, na czym? A może marzysz o prezentach, które zrobią wrażenie? 
              Nasza kompleksowa usługa obejmuje doradztwo, dobór najlepszych komponentów, profesjonalny montaż i optymalizację komputera, 
              który będzie idealnie dopasowany do Twoich potrzeb i oczekiwań.
            </Text>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.ctaButton}
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Zamów konfigurację
            </Button>
          </div>
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

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
      title: 'Komputer w Formie',
      description: 'Naprawimy Twój komputer, nawet jeśli wydaje się, że nie ma już nadziei!',
    },
    {
      icon: IconArrowUp,
      title: 'Upgrade PC',
      description: 'Nowe procesory, karty graficzne, dyski – upgrade, który zmieni Twoje PC!',
    },
    {
      icon: IconDeviceLaptop,
      title: 'Laptop Reanimacja',
      description: 'Przywróć życie swojemu laptopowi dzięki naszej kompleksowej naprawie!',
    },
    {
      icon: IconBrush,
      title: 'Chłodzenie 2.0',
      description: 'Profesjonalne czyszczenie układów chłodzenia – bo Twój sprzęt zasługuje na świeży start!',
    },
    {
      icon: IconProgress,
      title: 'Software',
      description: 'Zainstalujemy oprogramowanie, które napędzi Twój komputer!',
    },
    {
      icon: IconCpu,
      title: 'PC na Zamówienie',
      description: 'Zbudujemy PC idealnie dopasowane do Twoich potrzeb – moc, wydajność, styl.',
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
              Oferuję kompleksowe naprawy sprzętu komputerowego, które przywrócą Twojemu urządzeniu pełną sprawność! Niezależnie od tego, czy Twój laptop potrzebuje drobnej naprawy, czy komputer stacjonarny wymaga gruntownego serwisowania, gwarantuję najwyższą jakość usług oraz szybki czas realizacji. Zadbam o Twój sprzęt z pełnym profesjonalizmem i skutecznością, byś mógł cieszyć się jego niezawodnym działaniem!
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
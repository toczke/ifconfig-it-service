import { Card, Text, Badge, Group, Container, SimpleGrid, Title } from '@mantine/core';
import classes from './SampleProjects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export function SampleProjects() {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Budowa jednostki do grania',
      description: 'Zbadanie potrzeb i przedstawienie propozycji konfiguracji komputera pod Windowsa i macOS. Złożenie oraz przetestowanie systemu.',
      category: 'Doradztwo i składanie PC',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Optymalizacja stacji roboczej dla animatora 2D/3D',
      description: 'Konfiguracja sprzętowa i oprogramowania dla profesjonalnego renderowania 3D. Zastosowano najnowsze rozwiązania chłodzenia wodnego.',
      category: 'Konfiguracja specjalistyczna',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Czyszczenie laptopa Lenovo IdeaPad i reinstalacja systemu',
      description: 'Kompleksowe czyszczenie wnętrza laptopa oraz ponowna instalacja systemu operacyjnego dla zapewnienia płynnej pracy.',
      category: 'Konserwacja i reinstalacja',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Naprawa komputera stacjonarnego - wymiana zasilacza',
      description: 'Diagnoza uszkodzonego zasilacza, jego wymiana oraz dodatkowe czyszczenie wnętrza komputera i wymiana pasty termoprzewodzącej.',
      category: 'Naprawa sprzętowa',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Naprawa laptopa HP EliteBook 840 G7',
      description: 'Diagnoza stanu dysku twardego, wymiana na nowy SSD oraz odzyskiwanie danych z uszkodzonego dysku.',
      category: 'Naprawa laptopa',
      status: 'completed',
    },
    {
      id: 6,
      title: 'Instalacja systemu na laptopie ThinkPad T420',
      description: 'Instalacja najnowszej wersji systemu operacyjnego oraz konfiguracja sterowników i oprogramowania.',
      category: 'Instalacja oprogramowania',
      status: 'completed',
    },
  ];

  const statusColors = {
    completed: 'green',
    'in-progress': 'yellow',
    planned: 'blue'
  };

  return (
    <Container py="xl" size="xl">
      <Title order={2} mb="xl" ta="center" fw={700}>
        Nasze przykładowe realizacje
      </Title>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="xl"
        verticalSpacing="xl"
      >
        {projects.map((project) => (
          <Card
            key={project.id}
            withBorder
            radius="lg"
            padding="xl"
            className={classes.card}
            shadow="sm"
          >
            <Group justify="space-between" mt="md">
              <Text fz="lg" fw={700} className={classes.title}>
                {project.title}
              </Text>
              <Badge variant="light" color="blue" size="lg">
                {project.category}
              </Badge>
            </Group>

            <Text fz="md" mt="xs" lineClamp={3}>
              {project.description}
            </Text>

            <Group justify="space-between" mt="md">
              <Badge
                variant="filled"
                color={statusColors[project.status]}
                size="lg"
                radius="sm"
              >
                {project.status === 'completed' ? 'Zakończono' :
                 project.status === 'in-progress' ? 'W trakcie' : 'Planowane'}
              </Badge>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

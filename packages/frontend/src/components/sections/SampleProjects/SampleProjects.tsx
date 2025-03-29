import { Card, Text, Badge, Group, Container, SimpleGrid, Title, Button, Box, Avatar, Center, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './SampleProjects.module.css';

type ProjectStatus = 'completed' | 'in-progress' | 'planned';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
}

const PROJECTS: Project[] = [
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
  {
    id: 7,
    title: 'Naprawa zawiasów',
    description: 'Wycięcie oraz wspawanie nowego materiału do gniazd zawiasów w laptopie.',
    category: 'Naprawa laptopa',
    status: 'completed',
  },
];

const STATUS_COLORS: Record<ProjectStatus, string> = {
  completed: 'green',
  'in-progress': 'yellow',
  planned: 'blue'
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Zakończono',
  'in-progress': 'W trakcie',
  planned: 'Planowane'
};

export function SampleProjects() {
  const [expanded, { toggle }] = useDisclosure(false);
  const visibleProjects = expanded ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <Container py="xl" size="xl">
      <Title order={2} mb="xl" ta="center" fw={700}>
        Nasze przykładowe realizacje
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        {visibleProjects.map((project) => (
          <Card withBorder radius="md" className={classes.card} key={project.id}>
            <Card.Section>
              <Image
                src="/repair.jpg"
                height={180}
                alt="Project cover"
              />
            </Card.Section>

            <Badge className={classes.statusBadge} color={STATUS_COLORS[project.status]}>
              {STATUS_LABELS[project.status]}
            </Badge>

            <Text className={classes.title} fw={500} mt="md">
              {project.title}
            </Text>

            <Text fz="sm" c="dimmed" lineClamp={4}>
              {project.description}
            </Text>

            <Group justify="space-between" className={classes.footer}>
              <Center>
                <Avatar
                  src="/cover.jpg"
                  size={24}
                  radius="xl"
                  mr="xs"
                />
                <Text fz="sm" inline>
                  Tomasz Toczek
                </Text>
              </Center>

              <Badge color="blue" variant="light">
                {project.category}
              </Badge>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {PROJECTS.length > 3 && (
        <Box ta="center" mt="xl">
          <Button 
            variant="outline" 
            size="md" 
            onClick={toggle}
          >
            {expanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>
        </Box>
      )}
    </Container>
  );
}
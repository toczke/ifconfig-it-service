import { 
  Container, 
  Title, 
  Text, 
  Group, 
  Button, 
  Stack, 
  Badge, 
  Timeline, 
  ThemeIcon, 
  List, 
  Accordion, 
  Box,
  Card,
  Divider,
  Progress,
  rem
} from '@mantine/core';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  IconCheck, 
  IconTools, 
  IconClipboardCheck, 
  IconDownload, 
  IconFileDescription, 
  IconBrain, 
  IconCurrencyDollar,
  IconUser,
  IconDeviceDesktop,
  IconAlertTriangle
} from '@tabler/icons-react';

interface CostDetail {
  item: string;
  cost: string;
}

interface Job {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'declined';
  dateReceived: string;
  estimatedCompletion?: string;
  completionDate?: string;
  declinedDate?: string;
  customerName: string;
  deviceType: string;
  brand: string;
  problem: string;
  diagnosis: string[];
  plannedActions: string[];
  cost: string;
  costDetails: CostDetail[];
  progress: number;
  reportAvailable: boolean;
  receiptAvailable: boolean;
  declineReason?: string;
}

type JobsMap = {
  [key: string]: Job;
};

const MOCK_JOBS: JobsMap = {
  '1': {
    id: '1',
    status: 'in_progress',
    dateReceived: '2024-03-14',
    estimatedCompletion: '2024-03-16',
    customerName: 'Jan Kowalski',
    deviceType: 'PC Stacjonarny',
    brand: 'Custom Build',
    problem: 'Problemy z wydajnością, przegrzewanie się',
    diagnosis: [
      'Zakurzony układ chłodzenia',
      'Stara pasta termoprzewodząca',
      'Zapchane filtry wentylatorów'
    ],
    plannedActions: [
      'Czyszczenie układu chłodzenia',
      'Wymiana pasty termoprzewodzącej',
      'Czyszczenie i konserwacja wentylatorów',
      'Optymalizacja ustawień BIOS'
    ],
    cost: '250 zł',
    costDetails: [
      { item: 'Pasta termoprzewodząca Arctic MX-4', cost: '45 zł' },
      { item: 'Czyszczenie układu chłodzenia', cost: '80 zł' },
      { item: 'Konserwacja wentylatorów', cost: '60 zł' },
      { item: 'Konfiguracja BIOS', cost: '65 zł' }
    ],
    progress: 65,
    reportAvailable: false,
    receiptAvailable: false
  },
  '2': {
    id: '2',
    status: 'completed',
    dateReceived: '2024-03-10',
    completionDate: '2024-03-12',
    customerName: 'Anna Nowak',
    deviceType: 'Laptop',
    brand: 'Dell XPS 15',
    problem: 'Uszkodzony wyświetlacz',
    diagnosis: [
      'Pęknięta matryca LCD',
      'Uszkodzone zawiasy ekranu'
    ],
    plannedActions: [
      'Wymiana matrycy LCD',
      'Wymiana zawiasów',
      'Kalibracja ekranu'
    ],
    cost: '850 zł',
    costDetails: [
      { item: 'Matryca LCD Dell XPS 15', cost: '600 zł' },
      { item: 'Zawiasy ekranu', cost: '150 zł' },
      { item: 'Kalibracja i montaż', cost: '100 zł' }
    ],
    progress: 100,
    reportAvailable: true,
    receiptAvailable: true
  },
  '3': {
    id: '3',
    status: 'declined',
    dateReceived: '2024-03-13',
    declinedDate: '2024-03-13',
    customerName: 'Piotr Wiśniewski',
    deviceType: 'Laptop',
    brand: 'MacBook Pro 2019',
    problem: 'Nie włącza się, zalany płyn',
    diagnosis: [
      'Poważne uszkodzenie płyty głównej',
      'Korozja komponentów',
      'Uszkodzony układ zasilania'
    ],
    plannedActions: [
      'Wymiana płyty głównej',
      'Wymiana klawiatury',
      'Wymiana układu zasilania'
    ],
    cost: '3500 zł',
    costDetails: [
      { item: 'Płyta główna MacBook Pro', cost: '2800 zł' },
      { item: 'Klawiatura', cost: '400 zł' },
      { item: 'Układ zasilania', cost: '300 zł' }
    ],
    progress: 0,
    reportAvailable: true,
    receiptAvailable: false,
    declineReason: 'Koszt naprawy przekracza wartość urządzenia. Zalecany zakup nowego sprzętu.'
  }
};

export function JobStatus() {
  const { uniqueid } = useParams();
  
  if (!uniqueid || !MOCK_JOBS[uniqueid]) {
    return <Navigate to="/404" replace />;
  }

  const job = MOCK_JOBS[uniqueid];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge color="yellow" size="lg" variant="light">Oczekujące</Badge>;
      case 'in_progress':
        return <Badge color="blue" size="lg" variant="light">W trakcie realizacji</Badge>;
      case 'completed':
        return <Badge color="green" size="lg" variant="light">Zakończone</Badge>;
      case 'declined':
        return <Badge color="red" size="lg" variant="light">Odrzucone</Badge>;
      default:
        return <Badge color="gray" size="lg" variant="light">Nieznany</Badge>;
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'declined':
        return 'red';
      default:
        return 'blue';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'declined':
        return 'red';
      default:
        return 'blue';
    }
  };

  const handleDownloadReceipt = () => {
    alert('Funkcja pobierania rachunku będzie dostępna wkrótce');
  };

  const handleDownloadReport = () => {
    alert('Funkcja pobierania raportu serwisowego będzie dostępna wkrótce');
  };

  return (
    <Container size="md" py="xl" px="md">
      <Card shadow="md" radius="md" p="xl" withBorder>
        <Stack gap="xl">
          <Group justify="space-between" align="center">
            <Title order={2}>Zlecenie #{job.id}</Title>
            {getStatusBadge(job.status)}
          </Group>

          <Progress 
            value={job.progress} 
            color={getProgressColor(job.status)} 
            size="md" 
            radius="xl" 
          />

          <Timeline 
            active={job.status === 'completed' ? 5 : (job.status === 'declined' ? 4 : 3)} 
            bulletSize={28} 
            color={getTimelineColor(job.status)} 
            ml={4}
          >
            <Timeline.Item
              bullet={<ThemeIcon size={28} radius="xl" color="teal" variant="light"><IconClipboardCheck size={18} /></ThemeIcon>}
              title={<Text fw={500}>Przyjęcie zlecenia</Text>}
              lineVariant="solid"
            >
              <Text size="sm" mt={4}>Urządzenie przyjęte do serwisu</Text>
              <Text size="xs" c="dimmed" mt={2}>{job.dateReceived}</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<ThemeIcon size={28} radius="xl" color="blue" variant="light"><IconBrain size={18} /></ThemeIcon>}
              title={<Text fw={500}>Diagnoza</Text>}
              lineVariant="solid"
            >
              <Text size="sm" mt={4}>Przeprowadzono diagnostykę urządzenia</Text>
              <List size="xs" mt={8} spacing={6} c="dimmed" withPadding>
                {job.diagnosis.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Timeline.Item>

            <Timeline.Item
              bullet={<ThemeIcon size={28} radius="xl" color="grape" variant="light"><IconCurrencyDollar size={18} /></ThemeIcon>}
              title={<Text fw={500}>Wycena</Text>}
              lineVariant="solid"
            >
              <Text size="sm" mt={4}>Wysłano wycenę naprawy</Text>
              <Text size="sm" fw={500} mt={8} c="grape">Łączny koszt: {job.cost}</Text>
              <Box pr={16}>
                <Accordion variant="contained" radius="md" mt={8}>
                  <Accordion.Item value="costs">
                    <Accordion.Control>
                      <Group gap="xs">
                        <IconCurrencyDollar size={16} />
                        <Text size="sm">Szczegóły kosztów</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap={8}>
                        {job.costDetails.map((detail, index) => (
                          <Group key={index} justify="space-between">
                            <Text size="sm">{detail.item}</Text>
                            <Badge size="lg" variant="light">{detail.cost}</Badge>
                          </Group>
                        ))}
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Box>
            </Timeline.Item>

            {job.status === 'declined' ? (
              <Timeline.Item
                bullet={<ThemeIcon size={28} radius="xl" color="red" variant="light"><IconAlertTriangle size={18} /></ThemeIcon>}
                title={<Text fw={500}>Zamknięcie zlecenia - odmowa klienta</Text>}
                lineVariant="solid"
              >
                <Text size="sm" mt={4}>Zlecenie zostało zamknięte</Text>
                <Text size="xs" c="dimmed" mt={2}>{job.declinedDate}</Text>
                <Text size="sm" c="red" mt={4}>{job.declineReason}</Text>
              </Timeline.Item>
            ) : (
              <>
                <Timeline.Item
                  bullet={<ThemeIcon size={28} radius="xl" color="orange" variant="light"><IconTools size={18} /></ThemeIcon>}
                  title={<Text fw={500}>Naprawa</Text>}
                  lineVariant="dashed"
                >
                  <Text size="sm" mt={4}>Trwa naprawa urządzenia</Text>
                  <List size="xs" mt={8} spacing={6} c="dimmed" withPadding>
                    {job.plannedActions.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                  <Text size="xs" c="dimmed" mt={4}>Przewidywane zakończenie: {job.estimatedCompletion}</Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<ThemeIcon size={28} radius="xl" color="gray" variant="light"><IconCheck size={18} /></ThemeIcon>}
                  title={<Text fw={500}>Gotowe do odbioru</Text>}
                >
                  <Text size="sm" c="dimmed" mt={4}>
                    {job.status === 'completed' 
                      ? `Zakończono: ${job.completionDate}`
                      : 'Oczekiwanie na zakończenie naprawy'
                    }
                  </Text>
                </Timeline.Item>
              </>
            )}
          </Timeline>

          <Divider />

          <Card withBorder radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size="lg" variant="light" color={getTimelineColor(job.status)}>
                  <IconUser size={rem(20)} />
                </ThemeIcon>
                <Text fw={500}>Klient:</Text>
                <Text c="dimmed">{job.customerName}</Text>
              </Group>

              <Group>
                <ThemeIcon size="lg" variant="light" color={getTimelineColor(job.status)}>
                  <IconDeviceDesktop size={rem(20)} />
                </ThemeIcon>
                <Text fw={500}>Urządzenie:</Text>
                <Text c="dimmed">{job.deviceType} - {job.brand}</Text>
              </Group>

              <Group align="flex-start">
                <ThemeIcon size="lg" variant="light" color={getTimelineColor(job.status)}>
                  <IconAlertTriangle size={rem(20)} />
                </ThemeIcon>
                <Stack gap={4}>
                  <Text fw={500}>Zgłoszony problem:</Text>
                  <Text c="dimmed" size="sm">{job.problem}</Text>
                </Stack>
              </Group>

              {job.status === 'declined' && (
                <Group align="flex-start">
                  <ThemeIcon size="lg" variant="light" color="red">
                    <IconAlertTriangle size={rem(20)} />
                  </ThemeIcon>
                  <Stack gap={4}>
                    <Text fw={500}>Powód odrzucenia:</Text>
                    <Text c="dimmed" size="sm">{job.declineReason}</Text>
                  </Stack>
                </Group>
              )}
            </Stack>
          </Card>

          <Text size="sm" c="dimmed">
            Status twojego zlecenia jest na bieżąco aktualizowany. Możesz wrócić do tej strony później,
            używając tego samego linku lub numeru zlecenia.
          </Text>

          <Divider />

          <Group justify="flex-end" gap="md">
            <Button 
              variant="light" 
              color={job.reportAvailable ? "blue" : "orange"} 
              onClick={handleDownloadReport}
              leftSection={<IconFileDescription size={16} />}
              radius="md"
            >
              Pobierz raport serwisowy {!job.reportAvailable && "(niedostępny)"}
            </Button>
            <Button 
              variant="light" 
              color={job.receiptAvailable ? "blue" : "orange"} 
              onClick={handleDownloadReceipt}
              leftSection={<IconDownload size={16} />}
              radius="md"
            >
              Pobierz rachunek {!job.receiptAvailable && "(niedostępny)"}
            </Button>
            <Button 
              component={Link} 
              to="/" 
              variant="light"
              radius="md"
            >
              Wróć do strony głównej
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
} 
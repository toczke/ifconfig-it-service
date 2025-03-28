import { Timeline, Text, Title, Container, Center, Space, Box } from '@mantine/core';
import { 
  IconPhone, 
  IconClipboardCheck, 
  IconTools, 
  IconChecklist, 
  IconCircleCheck 
} from '@tabler/icons-react';

export function RepairTimeline() {
  return (
    <Container id="repairs" size="md" py="xl">
      <Box mb="xl" ta="center">
        <Title order={2} mb="sm">
          Jak wygląda nasz proces naprawy?
        </Title>
        <Text c="dimmed" maw={600} mx="auto">
            Nikt z nas nie lubi skomplikowanych procesów, dlatego u nas wszystko jest proste i przejrzyste!
        </Text>
      </Box>

      <Space h="xl" />

      <Center>
        <Timeline active={5} bulletSize={36} lineWidth={2}>
          <Timeline.Item 
            title="Zgłoszenie Problemu" 
            bullet={<IconPhone size={24} />}
          >
            <Text c="dimmed" size="sm">
              Skontaktuj się z nami – przez formularz online lub telefonicznie. Opowiedz o problemie, a my zajmiemy się resztą!
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Odebranie zlecenia"
            bullet={<IconClipboardCheck size={24} />}
          >
            <Text c="dimmed" size="sm">
              W momencie przesłania zapytania, nasz system od razu przekazuje informację o nowym zgłoszeniu.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Szybka Diagnoza"
            bullet={<IconClipboardCheck size={24} />}
          >
            <Text c="dimmed" size="sm">
              Dokładnie zbadamy Twój sprzęt, zidentyfikujemy usterkę i przedstawimy Ci jasną wycenę naprawy, krok po kroku.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Profesjonalna Naprawa"
            bullet={<IconTools size={24} />}
          >
            <Text c="dimmed" size="sm">
              Po akceptacji kosztów, przystępujemy do naprawy – szybko i skutecznie przywracamy pełną sprawność Twojego urządzenia.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Testy Sprawdzające"
            bullet={<IconChecklist size={24} />}
          >
            <Text c="dimmed" size="sm">
              Urządzenie przechodzi szereg testów, aby upewnić się, że działa jak nowe – bez żadnych niespodzianek!
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Gotowe do Odbioru"
            bullet={<IconCircleCheck size={24} />}
          >
            <Text c="dimmed" size="sm">
              Twoje urządzenie jest gotowe! Możesz je odebrać osobiście lub zostanie Tobie dostarczone.
            </Text>
          </Timeline.Item>
        </Timeline>
      </Center>

      <Space h="xl" />
    </Container>
  );
}

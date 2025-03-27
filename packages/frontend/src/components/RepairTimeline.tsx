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
          Jak wygląda proces naprawy?
        </Title>
        <Text c="dimmed" maw={600} mx="auto">
          Nasz przejrzysty proces gwarantuje szybką i profesjonalną obsługę. 
          Poniżej przedstawiamy kroki, które wykonujemy przy każdej naprawie, 
          aby zapewnić najwyższą jakość usług.
        </Text>
      </Box>

      <Space h="xl" />

      <Center>
        <Timeline active={4} bulletSize={36} lineWidth={2}>
          <Timeline.Item 
            title="Zgłoszenie" 
            bullet={<IconPhone size={24} />}
          >
            <Text c="dimmed" size="sm">
              Skontaktuj się z nami telefonicznie lub przez formularz online. 
              Opisz problem, a my zajmiemy się Twoim sprzętem.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Diagnoza"
            bullet={<IconClipboardCheck size={24} />}
          >
            <Text c="dimmed" size="sm">
              Dokładnie badamy urządzenie, identyfikujemy usterkę i przedstawiamy 
              szczegółową wycenę naprawy z rozbiciem na poszczególne pozycje.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Naprawa"
            bullet={<IconTools size={24} />}
          >
            <Text c="dimmed" size="sm">
              Po akceptacji wyceny, przystępujemy do profesjonalnej naprawy.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Testy"
            bullet={<IconChecklist size={24} />}
          >
            <Text c="dimmed" size="sm">
              Po naprawie przeprowadzamy serię testów, aby upewnić się, 
              że urządzenie działa poprawnie.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Odbiór"
            bullet={<IconCircleCheck size={24} />}
          >
            <Text c="dimmed" size="sm">
              Gotowe urządzenie możesz odebrać osobiście lub zostanie dostarczone pod drzwi.
            </Text>
          </Timeline.Item>
        </Timeline>
      </Center>

      <Space h="xl" />
    </Container>
  );
}
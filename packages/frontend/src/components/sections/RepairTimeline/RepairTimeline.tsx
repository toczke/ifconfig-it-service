import { Timeline, Text, Title, Container, Center, Space, Box } from '@mantine/core';
import { 
  IconPhone, 
  IconClipboardCheck, 
  IconTools, 
  IconChecklist, 
  IconCircleCheck 
} from '@tabler/icons-react';
import { useEffect, useState, useRef } from 'react';
import classes from './RepairTimeline.module.css';

export function RepairTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const timelineElement = timelineRef.current;
      if (!timelineElement) return;
  
      const { bottom, height } = timelineElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility (0 when top at screen bottom, 1 when bottom at screen top)
      const visibility = 1 - (bottom / (windowHeight + height * 1));
      const progress = Math.min(Math.max(visibility, 0), 1);
      
      // Map to timeline items (6 items) with faster progression
      const newActiveIndex = Math.floor(progress * 5 * 10);
      setActiveIndex(Math.min(newActiveIndex, 5));
    };
  
    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };
  
    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll();
  
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <Container className={classes.wrapper} size="md" py="xl" id="repair-process">
      <Box className={classes.header}>
        <Title className={classes.title} order={2}>
          Jak wygląda nasz proces naprawy?
        </Title>
        <Text className={classes.description}>
          Nikt z nas nie lubi skomplikowanych procesów, dlatego u nas wszystko jest proste i przejrzyste!
        </Text>
      </Box>

      <Space h="xl" />

      <Center>
        <div ref={timelineRef} className={classes.timelineWrapper}>
          <Timeline 
            active={activeIndex}
            classNames={{
              root: classes.root,
              item: classes.item,
              itemBody: classes.itemBody,
              itemTitle: classes.itemTitle,
              itemContent: classes.itemContent,
              itemBullet: classes.itemBullet,
            }}
            styles={{
              root: {
                '--tl-bullet-size': '48px',
                '--tl-color': 'var(--mantine-color-blue-6)',
                '--tl-icon-color': 'var(--mantine-color-white)',
                '--tl-line-width': '2px',
                '--tl-radius': '50%',
              },
            }}
          >
            <Timeline.Item 
              title="Zgłoszenie Problemu" 
              bullet={<IconPhone size={24} />}
            >
              <Text className={classes.timelineText}>
                Skontaktuj się z nami – przez formularz online lub telefonicznie. Opowiedz o problemie, a my zajmiemy się resztą!
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Odebranie zlecenia"
              bullet={<IconClipboardCheck size={24} />}
            >
              <Text className={classes.timelineText}>
                W momencie przesłania zapytania, nasz system od razu przekazuje informację o nowym zgłoszeniu.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Szybka Diagnoza"
              bullet={<IconClipboardCheck size={24} />}
            >
              <Text className={classes.timelineText}>
                Dokładnie zbadamy Twój sprzęt, zidentyfikujemy usterkę i przedstawimy Ci jasną wycenę naprawy, krok po kroku.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Profesionalna Naprawa"
              bullet={<IconTools size={24} />}
            >
              <Text className={classes.timelineText}>
                Po akceptacji kosztów, przystępujemy do naprawy – szybko i skutecznie przywracamy pełną sprawność Twojego urządzenia.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Testy Sprawdzające"
              bullet={<IconChecklist size={24} />}
            >
              <Text className={classes.timelineText}>
                Urządzenie przechodzi szereg testów, aby upewnić się, że działa jak nowe – bez żadnych niespodzianek!
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Gotowe do Odbioru"
              bullet={<IconCircleCheck size={24} />}
            >
              <Text className={classes.timelineText}>
                Twoje urządzenie jest gotowe! Możesz je odebrać osobiście lub zostanie Tobie dostarczone.
              </Text>
            </Timeline.Item>
          </Timeline>
        </div>
      </Center>

      <Space h="xl" />
    </Container>
  );
}
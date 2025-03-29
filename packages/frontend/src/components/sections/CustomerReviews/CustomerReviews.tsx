import {
  Card,
  Text,
  Rating,
  Container,
  Flex,
  ScrollArea,
  Badge,
  Box
} from '@mantine/core';
import classes from './CustomerReviews.module.css';

interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  comment: string;
}

export function CustomerReviews() {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Sara C',
      service: 'Czyszczenie laptopa & reinstalacja systemu',
      rating: 5,
      comment: 'Szybka i profesjonalna naprawa, polecam!',
    },
    {
      id: 2,
      name: 'Igor B',
      service: 'Naprawa komputera stacjonalnego',
      rating: 5,
      comment: 'Ekspresowo wykonana usługa, od diagnozy uszkodzonego zasilacza do jej wymiany. Pan Tomasz zaoferował dodatkowe czyszczenie i wymianę pasty przez co mój komputer ożył na nowo!',
    },
    {
      id: 3,
      name: 'Maja C',
      service: 'Naprawa laptopa',
      rating: 5,
      comment: 'Szybka diagnoza, dysk na wykończeniu. Dzięki szybkiej diagnozie udało się uratować część plików. Dostałam zalecenia jak wykonywać kopię danych żeby nie doszło do tego w przyszłości.',
    },
    {
      id: 4,
      name: 'Jan L',
      service: 'Instalacja systemu',
      rating: 5,
      comment: 'Serwis zrobiony tego samego dnia, wszystko ok',
    },
  ];

  return (
    <Container size="lg" py="md">
      <Text size="lg" fw={600} mb="sm">Opinie klientów</Text>
      <ScrollArea type="always" offsetScrollbars>
        <Box className={classes.cardsWrapper}>
          <Flex gap="md" pb="md" className={classes.reviewsContainer}>
            {reviews.map((review) => (
              <Card 
                withBorder 
                radius="md" 
                p="sm" 
                key={review.id} 
                className={classes.reviewCard}
              >
                <Flex direction="column" gap={4} className={classes.cardContent}>
                  <Text fz="sm" fw={600}>{review.name}</Text>
                  <Badge variant="light" color="blue" size="xs" w="fit-content">
                    {review.service}
                  </Badge>
                  <Rating value={review.rating} readOnly size="sm" mt={4} />
                  <Text fz="xs" c="dimmed" mt={4} className={classes.commentText}>
                    {review.comment}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>
      </ScrollArea>

      <Text c="dimmed" size="sm" mt="xl" ta="center">
        * Opinie dotyczą usług wykonanych przed stworzeniem tej strony, opinie z map google wkrótce.
      </Text>
    </Container>
  );
}

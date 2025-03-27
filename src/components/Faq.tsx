import { Accordion, Container, Title, Text, Space } from '@mantine/core';
import classes from './Faq.module.css';

export function Faq() {
  return (
    <Container size="sm" className={classes.wrapper} id="faq">
      <Title ta="center" className={classes.title}>
        Najczęściej zadawane pytania
      </Title>
      
      <Space h="xl" /> {/* Added spacing element */}

      <Accordion variant="separated" radius="md">
        <Accordion.Item className={classes.item} value="diagnostics">
          <Accordion.Control>Ile kosztuje diagnostyka usterki?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Podstawowa diagnostyka kosztuje 50 zł. Jeśli zdecydujesz się na naprawę u nas, koszt diagnostyki zostanie odliczony od ceny finalnej.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="time">
          <Accordion.Control>Ile trwa typowa naprawa?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Większość napraw wykonujemy w ciągu 24-48 godzin. W przypadku poważniejszych usterek czas może wydłużyć się do 5 dni roboczych.
              Pilne naprawy (express) są możliwe za dodatkową opłatą.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="warranty">
          <Accordion.Control>Jak wygląda gwarancja na naprawy?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Oferujemy 12-miesięczną gwarancję na wszystkie wykonane naprawy. Gwarancja obejmuje zarówno części jak i robociznę.
              Wyjątkiem są uszkodzenia mechaniczne spowodowane przez klienta.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="parts">
          <Accordion.Control>Czy zapewniacie części zamienne?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Tak, dysponujemy szerokim asortymentem części zamiennych do popularnych modeli. W przypadku rzadkich części,
              możemy je sprowadzić na zamówienie (czas oczekiwania 3-7 dni). Istnieje również możliwość dostarczenia części przez klienta.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="data">
          <Accordion.Control>Czy moje dane są bezpieczne podczas naprawy?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Zawsze zalecamy wykonanie kopii zapasowej przed oddaniem sprzętu. Jeśli to niemożliwe, możemy zabezpieczyć Twoje dane przed
              utratą (usługa dodatkowa 80 zł). Nie przeglądamy zawartości dysków bez wyraźnej potrzeby technicznej.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>Jakie formy płatności akceptujecie?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Przyjmujemy płatności gotówką, przelewem tradycyjnym oraz szybkim przelewem online. Dla stałych klientów możliwa jest płatność
              w ratach (wymagana przedpłata 50%).
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="location">
          <Accordion.Control>Czy odbieracie sprzęt do naprawy?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Oferujemy bezpłatny odbiór i dostawę sprzętu w promieniu 15 km od naszej siedziby. Dla dalszych lokalizacji
              ustalamy indywidualne warunki (koszt zależny od odległości).
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item className={classes.item} value="receipt">
        <Accordion.Control>Czy dostanę paragon?</Accordion.Control>
        <Accordion.Panel>
            <Text>
                Serwis działa na zasadach nierejestrowanej działalności. Do każdej usługi wystawiamy rachunek za usługę, za części klient otrzymuje paragon ze sklepu.
            </Text>
        </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
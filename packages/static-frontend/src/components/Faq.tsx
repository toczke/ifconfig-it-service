import { Accordion, Container, Title, Text, Space } from '@mantine/core';
import classes from './Faq.module.css';

export function Faq() {
  return (
    <Container size="sm" className={classes.wrapper} id="faq">
      <Title ta="center" className={classes.title}>
        Najczęściej zadawane pytania
      </Title>
      
      <Space h="xl" />

      <Accordion variant="separated" radius="md">
        <Accordion.Item className={classes.item} value="why-me">
          <Accordion.Control>Dlaczego warto wybrać mój serwis?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Pracowałem jako inżynier laboratoryjny w dziale wsparcia technicznego, gdzie zdobyłem praktyczną wiedzę o sprzęcie komputerowym. Obecnie rozwijam się jako inżynier QA, co pozwala mi łączyć szczegółowe podejście testerskie z umiejętnościami serwisowymi.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="diagnostics">
          <Accordion.Control>Ile kosztuje diagnoza problemu?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Podstawowa diagnoza kosztuje 50 zł. Jeśli zdecydujesz się na naprawę, ta kwota zostanie odliczona od ostatecznego kosztu usługi.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="time">
          <Accordion.Control>Jak długo trwa naprawa?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Większość napraw wykonuję w ciągu 1-2 dni roboczych. W przypadku konieczności zamówienia części czas może się wydłużyć - zawsze informuję o tym przed rozpoczęciem naprawy.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="parts">
          <Accordion.Control>Czy zapewniacie części zamienne?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Nie posiadam magazynu części, ale zorganizuję ich zakup po przedstawieniu kosztorysu i uzyskaniu Twojej akceptacji.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>Jakie formy płatności akceptujesz?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Przyjmuję płatności gotówką, przelewem bankowym oraz przez system BLIK.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="location">
          <Accordion.Control>Gdzie odbywa się naprawa sprzętu?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Pracuję w domowym warsztacie w Gdańsku. Możesz dostarczyć sprzęt osobiście po wcześniejszym umówieniu się.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="receipt">
          <Accordion.Control>Czy wystawiasz faktury?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Świadczę usługi jako działalność nierejestrowana. Na życzenie mogę wystawić rachunek. 
              Istnieje możliwość wystawienia faktury przez platformę useme, jednak wiąże się to z dodatkową prowizją w wysokości około 10-15% wartości usługi.
              W przypadku zakupu części, otrzymasz paragon od sprzedawcy.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
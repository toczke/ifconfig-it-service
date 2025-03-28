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
          <Accordion.Control>Dlaczego ifConfig?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Od dzieciństwa pasjonuję się komputerami. Mialem dość długi w Intelu, a teraz jestem inżynierem QA. Zawsze staram się oferować jak najlepszą jakość usług, z pełnym zaangażowaniem w każde zlecenie. Moje doświadczenie w IT pozwala mi na oferowanie kompleksowych rozwiązań w sposób profesjonalny i indywidualny.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="diagnostics">
          <Accordion.Control>Ile kosztuje diagnostyka usterki?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Podstawowa diagnostyka kosztuje 50 zł. Jeśli zdecydujesz się na naprawę u nas, koszt diagnostyki zostanie odliczony od ceny finalnej usługi.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="time">
          <Accordion.Control>Ile trwa typowa naprawa?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Większość napraw wykonujemy w ciągu 24-48 godzin. Dodatkowy czas może być potrzebny na zdobycie części, jeśli są one potrzebne do naprawy. 
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="parts">
          <Accordion.Control>Czy zapewniacie części zamienne?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Nie dysponujemy częściami zamiennymi na miejscu, ale możemy je zorganizować po zaakceptowaniu kosztorysu.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>Jakie formy płatności akceptujecie?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Akceptujemy płatności gotówką, przelewem tradycyjnym oraz Blikiem.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="location">
          <Accordion.Control>Czy odbieracie sprzęt do naprawy?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Tak, oferujemy odbiór i dostawę sprzętu. Przyjmujemy również sprzęt na miejscu w naszej lokalizacji.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="receipt">
          <Accordion.Control>Czy dostanę paragon?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Świadczymy usługi napraw i serwisu w ramach działalności nierejestrowanej. Wystawiamy rachunki za wykonane usługi. W przypadku zakupu części na życzenie klienta, klient otrzymuje paragon fiskalny bezpośrednio od sprzedawcy części.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

import { 
  Tabs, 
  Table, 
  Title, 
  Text, 
  Container, 
  ThemeIcon, 
  Badge
} from '@mantine/core';
import { 
  IconHammer, 
  IconCode, 
  IconCpu, 
  IconList,
  IconDeviceLaptop,
  IconDeviceDesktop
} from '@tabler/icons-react';
import classes from './Pricing.module.css';

const commonPricing = [
  { service: 'Diagnostyka', price: '0 zł', duration: '1-2h', warranty: '-', parts: 'W przypadku zrezygnowania z usługi naprawy 50 zł' },
  { service: 'Czyszczenie sprzętu (+ wymiana pasty termoprzewodzącej)', price: '100-200 zł', duration: '1-6h', warranty: '3 miesiące', parts: 'Zamień pastę na PTM7950 + 50 zł' },
  { service: 'Instalacja systemu', price: '100 zł', duration: '1-2h', warranty: '1 miesiąc', parts: 'Licencja na system operacyjny (w przypadku jej braku)' },
];

const laptopPricing = [
  { service: 'Wymiana matrycy', price: '100 zł', duration: '1 dzień', warranty: '12 miesięcy', parts: '+ cena matrycy' },
  { service: 'Wymiana baterii', price: '100 zł', duration: '1 dzień', warranty: '6 miesięcy', parts: '+ cena baterii' },
  { service: 'Wymiana klawiatury', price: '100 zł', duration: '1 dzień', warranty: '12 miesięcy', parts: '+ cena klawiatury' },
];

const desktopPricing = [
  { service: 'Wymiana komponentu', price: '50 zł', duration: '1-2h', warranty: '12 miesięcy', parts: 'Koszt komponentu osobno' },
  { service: 'OverClocking', price: '100 zł', duration: '4-6h', warranty: '-', parts: '' },
];

const softwarePricing = [
  { service: 'Usuwanie wirusów', price: '120-250 zł', duration: '2-4h', warranty: '1 miesiąc', parts: '-' },
  { service: 'Odzyskiwanie danych', price: 'od 300 zł', duration: '1-3 dni', warranty: '-', parts: '-' },
  { service: 'Optymalizacja systemu', price: '100 zł', duration: '2-3h', warranty: '1 miesiąc', parts: '-' },
  { service: 'Konfiguracja sieci domowej', price: '100-300 zł', duration: '2-6h', warranty: '1 miesiąc', parts: 'Cena uzależniona od złożoności' },
];

const customPcPricing = [
  { service: 'Pomoc w wyborze konfiguracji', price: '100 zł', duration: '1 dzień', warranty: 'Zgodnie z częściami producentów', parts: 'Wariant bez składania' },
  { service: 'Podstawowa - złożenie PC i instalacja systemu', price: '150 zł', duration: '1 dzień', warranty: 'Zgodnie z częściami producentów', parts: 'Koszt komponentów osobno' },
  { service: 'Rozszerzona - Podstawowa + optymalizacja BIOSu oraz systemu', price: '200 zł', duration: '1-2 dni', warranty: 'Zgodnie z częściami producentów', parts: 'Koszt komponentów osobno' },
  { service: 'Premium - Rozszerzona + montaż PTM7950 zamiast pasty', price: '250 zł', duration: '1-3 dni', warranty: 'Zgodnie z częściami producentów', parts: 'Koszt komponentów osobno' },
];

export function Pricing() {
  return (
    <Container size="lg" py="xl" className={classes.wrapper} id="cennik">
      <Title order={2} className={classes.title} ta="center">
        Cennik Usług
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Przejrzyste ceny za wszystkie nasze usługi, podane ceny są cenami brutto.
      </Text>

      <Tabs defaultValue="common" mt="xl">
        <Tabs.List grow>
          <Tabs.Tab 
            value="common" 
            leftSection={
              <ThemeIcon variant="transparent" color="gray" size="sm">
                <IconList size={18} />
              </ThemeIcon>
            }
          >
            Podstawowe
          </Tabs.Tab>
          <Tabs.Tab 
            value="hardware"
            leftSection={
              <ThemeIcon variant="transparent" color="gray" size="sm">
                <IconHammer size={18} />
              </ThemeIcon>
            }
          >
            Hardware
          </Tabs.Tab>
          <Tabs.Tab 
            value="software"
            leftSection={
              <ThemeIcon variant="transparent" color="gray" size="sm">
                <IconCode size={18} />
              </ThemeIcon>
            }
          >
            Software
          </Tabs.Tab>
          <Tabs.Tab 
            value="custompc"
            leftSection={
              <ThemeIcon variant="transparent" color="gray" size="sm">
                <IconCpu size={18} />
              </ThemeIcon>
            }
          >
            Custom PC
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="common" pt="xs">
          <Table striped highlightOnHover mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Usługa</Table.Th>
                <Table.Th>Cena usługi</Table.Th>
                <Table.Th>Czas realizacji</Table.Th>
                <Table.Th>Gwarancja</Table.Th>
                <Table.Th>Dodatkowe koszty</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {commonPricing.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.service}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {item.price}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{item.duration}</Table.Td>
                  <Table.Td>{item.warranty}</Table.Td>
                  <Table.Td>{item.parts}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="hardware" pt="xs">
          <Tabs defaultValue="laptop" variant="outline">
            <Tabs.List>
              <Tabs.Tab 
                value="laptop"
                leftSection={<IconDeviceLaptop size={16} />}
              >
                Laptopy
              </Tabs.Tab>
              <Tabs.Tab 
                value="desktop"
                leftSection={<IconDeviceDesktop size={16} />}
              >
                Komputery stacjonarne
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="laptop" pt="xs">
              <Table striped highlightOnHover mt="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Usługa</Table.Th>
                    <Table.Th>Cena usługi</Table.Th>
                    <Table.Th>Czas realizacji</Table.Th>
                    <Table.Th>Gwarancja</Table.Th>
                    <Table.Th>Koszt części</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {laptopPricing.map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{item.service}</Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="blue">
                          {item.price}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{item.duration}</Table.Td>
                      <Table.Td>{item.warranty}</Table.Td>
                      <Table.Td>{item.parts}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="desktop" pt="xs">
              <Table striped highlightOnHover mt="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Usługa</Table.Th>
                    <Table.Th>Cena usługi</Table.Th>
                    <Table.Th>Czas realizacji</Table.Th>
                    <Table.Th>Gwarancja</Table.Th>
                    <Table.Th>Koszt części</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {desktopPricing.map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{item.service}</Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="blue">
                          {item.price}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{item.duration}</Table.Td>
                      <Table.Td>{item.warranty}</Table.Td>
                      <Table.Td>{item.parts}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="software" pt="xs">
          <Table striped highlightOnHover mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Usługa</Table.Th>
                <Table.Th>Cena usługi</Table.Th>
                <Table.Th>Czas realizacji</Table.Th>
                <Table.Th>Gwarancja</Table.Th>
                <Table.Th>Uwagi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {softwarePricing.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.service}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {item.price}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{item.duration}</Table.Td>
                  <Table.Td>{item.warranty}</Table.Td>
                  <Table.Td>{item.parts}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="custompc" pt="xs">
          <Table striped highlightOnHover mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rodzaj usługi</Table.Th>
                <Table.Th>Cena usługi</Table.Th>
                <Table.Th>Czas realizacji</Table.Th>
                <Table.Th>Gwarancja</Table.Th>
                <Table.Th>Komponenty</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {customPcPricing.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.service}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {item.price}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{item.duration}</Table.Td>
                  <Table.Td>{item.warranty}</Table.Td>
                  <Table.Td>{item.parts}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>

      <Text c="dimmed" size="sm" mt="xl" ta="center">
        * Ceny są orientacyjne i mogą się różnić w zależności od konkretnego przypadku
      </Text>
    </Container>
  );
}
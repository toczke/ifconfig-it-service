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
  IconDeviceLaptop, 
  IconCode, 
  IconDeviceDesktop, 
  IconList
} from '@tabler/icons-react';
import classes from './Pricing.module.css';

const commonPricing = [
  { service: 'Diagnostyka', price: '0 zł', warranty: '-', parts: 'W przypadku zrezygnowania z usługi naprawy 50 zł' },
  { service: 'Czyszczenie sprzętu (+ wymiana pasty termoprzewodzącej)', price: '100-200 zł', warranty: '3 msc', parts: 'Zamień pastę na PTM7950 + 50 zł' },
  { service: 'Instalacja systemu', price: '100 zł', warranty: '1 msc', parts: 'Licencja na system operacyjny (w przypadku jej braku)' },
];

const laptopPricing = [
  { service: 'Wymiana matrycy', price: '100 zł', warranty: '12 msc', parts: '+ cena matrycy' },
  { service: 'Wymiana baterii', price: '100 zł', warranty: '6 msc', parts: '+ cena baterii' },
  { service: 'Wymiana klawiatury', price: '100 zł', warranty: '12 msc', parts: '+ cena klawiatury' },
];

const desktopPricing = [
  { service: 'Wymiana komponentu', price: '50 zł', warranty: '12 msc', parts: 'Koszt komponentu osobno' },
  { service: 'OverClocking', price: '100 zł', warranty: '-', parts: '' },
];

const softwarePricing = [
  { service: 'Usuwanie wirusów', price: '120-250 zł', warranty: '1 msc', parts: '-' },
  { service: 'Odzyskiwanie danych', price: 'od 300 zł', warranty: '-', parts: '-' },
  { service: 'Optymalizacja systemu', price: '100 zł', warranty: '1 msc', parts: '-' },
  { service: 'Konfiguracja sieci domowej', price: '100-300 zł', warranty: '1 msc', parts: 'Cena uzależniona od złożoności' },
];

const customPcPricing = [
  { service: 'Pomoc w wyborze konfiguracji', price: '100 zł', warranty: 'Zgodnie z częściami', parts: 'Wariant bez składania' },
  { service: 'Podstawowa - złożenie PC i instalacja systemu', price: '150 zł', warranty: 'Zgodnie z częściami', parts: 'Koszt komponentów osobno' },
  { service: 'Rozszerzona - Podstawowa + optymalizacja BIOSu oraz systemu', price: '200 zł', warranty: 'Zgodnie z częściami', parts: 'Koszt komponentów osobno' },
  { service: 'Premium - Rozszerzona + montaż PTM7950 zamiast pasty', price: '250 zł', warranty: 'Zgodnie z częściami', parts: 'Koszt komponentów osobno' },
];

export function Pricing() {
  return (
    <Container size="lg" py="xl" className={classes.wrapper} id="cennik">
      <Title order={2} className={classes.title} ta="center">
        Cennik Usług
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Przejrzyste ceny za wszystkie nasze usługi, w końcu nikt nie lubi kruczków.
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
                <IconDeviceLaptop size={18} />
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
                <IconDeviceDesktop size={18} />
              </ThemeIcon>
            }
          >
            Custom PC
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="common" pt="xs">
          <div className={classes.tableWrapper}>
            <Table striped highlightOnHover mt="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Usługa</Table.Th>
                  <Table.Th>Cena usługi</Table.Th>
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
                    <Table.Td>{item.warranty}</Table.Td>
                    <Table.Td>{item.parts}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
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
              <div className={classes.tableWrapper}>
                <Table striped highlightOnHover mt="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Usługa</Table.Th>
                      <Table.Th>Cena usługi</Table.Th>
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
                        <Table.Td>{item.warranty}</Table.Td>
                        <Table.Td>{item.parts}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="desktop" pt="xs">
              <div className={classes.tableWrapper}>
                <Table striped highlightOnHover mt="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Usługa</Table.Th>
                      <Table.Th>Cena usługi</Table.Th>
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
                        <Table.Td>{item.warranty}</Table.Td>
                        <Table.Td>{item.parts}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="software" pt="xs">
          <div className={classes.tableWrapper}>
            <Table striped highlightOnHover mt="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Usługa</Table.Th>
                  <Table.Th>Cena usługi</Table.Th>
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
                    <Table.Td>{item.warranty}</Table.Td>
                    <Table.Td>{item.parts}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="custompc" pt="xs">
          <div className={classes.tableWrapper}>
            <Table striped highlightOnHover mt="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Rodzaj usługi</Table.Th>
                  <Table.Th>Cena usługi</Table.Th>
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
                    <Table.Td>{item.warranty}</Table.Td>
                    <Table.Td>{item.parts}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Tabs.Panel>
      </Tabs>

      <Text c="dimmed" size="sm" mt="xl" ta="center">
          * Podane ceny są cenami brutto, w przypadku potrzeby wystawienia FV za usługę doliczona zostaje prowizja <a href="https://useme.com/pl/pricing/" target="_blank" rel="noopener noreferrer">USEME</a>
      </Text>
    </Container>
  );
}
import { useState, useEffect } from 'react';
import { Burger, Container, Group, AppShell, Tooltip, Button, ActionIcon, useMantineColorScheme, Box, Drawer, Stack, UnstyledButton, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTools, IconMail, IconSun, IconMoon, IconQuestionMark, IconDeviceDesktop, IconSearch, IconCurrencyZloty } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import IfconfigLogo from './IfconfigLogo';
import classes from './Header.module.css';

const services = [
  {
    id: 'repairs',
    label: 'Naprawy',
    icon: <IconTools size={16} />,
  },
  {
    id: 'custompc',
    label: 'Składanie PC',
    icon: <IconDeviceDesktop size={16} />,
  },
  {
    id: 'cennik',
    label: 'Cennik',
    icon: <IconCurrencyZloty size={16} />,
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <IconQuestionMark size={16} />,
  },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string | null>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobNumber, setJobNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const scrollPosition = window.scrollY + headerHeight + 20;

      for (const service of services) {
        const element = document.getElementById(service.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(service.id);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActive(id);
    }
  };

  const handleJobSearch = () => {
    if (jobNumber.trim()) {
      navigate(`/job/${jobNumber.trim()}`);
      setIsModalOpen(false);
      setJobNumber('');
    }
  };

  const navItems = services.map((service) => (
    <UnstyledButton
      key={service.id}
      className={classes.link}
      data-active={active === service.id || undefined}
      onClick={() => scrollToSection(service.id)}
    >
      {service.icon}
      <span>{service.label}</span>
    </UnstyledButton>
  ));

  const handleThemeToggle = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newColorScheme);
    toggleColorScheme();
  };

  return (
    <AppShell.Header className={classes.header} withBorder={false}>
      <Container size={1400} className={classes.inner}>
        <Box
          component="a"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActive(null);
          }}
          className={classes.logoContainer}
        >
          <IfconfigLogo className={classes.logo} />
        </Box>

        <Group className={classes.mainNav} visibleFrom="sm">
          {navItems}
        </Group>

        <Group className={classes.buttons} visibleFrom="sm">
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
            leftSection={<IconMail size={16} />}
            onClick={() => scrollToSection('kontakt')}
            className={classes.ctaButton}
            size="sm"
          >
            Napisz do nas
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
            leftSection={<IconSearch size={16} />}
            onClick={() => setIsModalOpen(true)}
            className={classes.statusButton}
            size="sm"
          >
            Status zlecenia
          </Button>

          <Tooltip 
            label={colorScheme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny'} 
            position="bottom" 
            withArrow
          >
            <ActionIcon
              variant="subtle"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className={classes.themeToggle}
              style={{
                backgroundColor: colorScheme === 'dark' 
                  ? 'rgba(255, 255, 0, 0.1)' 
                  : 'rgba(0, 0, 255, 0.1)',
                color: colorScheme === 'dark' 
                  ? 'var(--mantine-color-yellow-4)' 
                  : 'var(--mantine-color-blue-6)',
              }}
            >
              {colorScheme === 'dark' ? <IconSun size={24} /> : <IconMoon size={24} />}
            </ActionIcon>
          </Tooltip>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle navigation"
          className={classes.burger}
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="xl" p="md">
          {services.map((service) => (
            <Button
              key={service.id}
              variant="subtle"
              size="lg"
              leftSection={service.icon}
              onClick={() => {
                scrollToSection(service.id);
                close();
              }}
              className={classes.mobileLink}
              data-active={active === service.id || undefined}
              fullWidth
            >
              {service.label}
            </Button>
          ))}
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
            leftSection={<IconMail size={16} />}
            onClick={() => {
              scrollToSection('kontakt');
              close();
            }}
            className={classes.mobileCtaButton}
            size="sm"
            fullWidth
          >
            Napisz do nas
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
            leftSection={<IconSearch size={16} />}
            onClick={() => {
              setIsModalOpen(true);
              close();
            }}
            className={classes.mobileCtaButton}
            size="sm"
            fullWidth
          >
            Status zlecenia
          </Button>
          <Button
            variant="default"
            leftSection={colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            onClick={() => {
              toggleColorScheme();
              close();
            }}
            className={classes.mobileThemeButton}
            fullWidth
          >
            {colorScheme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny'}
          </Button>
        </Stack>
      </Drawer>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setJobNumber('');
        }}
        title="Sprawdź status zlecenia"
        centered
        size="sm"
        keepMounted={false}
        closeOnClickOutside={true}
        closeOnEscape={true}
        withinPortal={true}
      >
        <Stack>
          <TextInput
            label="Numer zlecenia"
            placeholder="Wprowadź numer zlecenia"
            value={jobNumber}
            onChange={(event) => setJobNumber(event.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleJobSearch();
              }
            }}
            data-autofocus
          />
          <Button onClick={handleJobSearch} fullWidth>
            Sprawdź
          </Button>
        </Stack>
      </Modal>
    </AppShell.Header>
  );
}

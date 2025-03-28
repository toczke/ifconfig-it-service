import { useState, useEffect } from 'react';
import { Burger, Container, Group, AppShell, Tooltip, Button, ActionIcon, useMantineColorScheme, Box, Drawer, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTools, IconMail, IconCurrencyDollar, IconSun, IconMoon, IconQuestionMark, IconDeviceDesktop } from '@tabler/icons-react';
import IfconfigLogo from './IfconfigLogo';
import classes from './Header.module.css';

const services = [
  { id: 'repairs', label: 'Naprawy', icon: <IconTools size={18} /> },
  { id: 'custompc', label: 'Składanie PC', icon: <IconDeviceDesktop size={18} /> },
  { id: 'cennik', label: 'Cennik', icon: <IconCurrencyDollar size={18} /> },
  { id: 'faq', label: 'FAQ', icon: <IconQuestionMark size={18} /> },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string | null>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight - 20,
        behavior: 'smooth'
      });
      setActive(sectionId);
      close();
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
      <span className={classes.linkText}>{service.label}</span>
    </UnstyledButton>
  ));

  const handleThemeToggle = () => {
    toggleColorScheme();
  };

  return (
    <AppShell.Header className={classes.header} withBorder={false}>
      <Container size="lg" className={classes.inner}>
        <Group justify="space-between" h="100%" w="100%">
          <Box
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActive(null);
            }}
            className={classes.logoContainer}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IfconfigLogo className={classes.logo} />
          </Box>

          <Group gap="md" visibleFrom="sm">
            {navItems}
          </Group>

          <Group gap="xl" visibleFrom="sm">
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
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
        withCloseButton
      >
        <Stack gap="xl" p="md">
          {services.map((service) => (
            <Button
              key={service.id}
              variant="subtle"
              size="lg"
              leftSection={service.icon}
              onClick={() => scrollToSection(service.id)}
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
            onClick={() => scrollToSection('kontakt')}
            className={classes.mobileCtaButton}
            size="sm"
            h={36}
            fullWidth
          >
            Napisz do nas
          </Button>
          <Button
            variant="default"
            leftSection={colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            onClick={toggleColorScheme}
            className={classes.mobileThemeButton}
            fullWidth
          >
            {colorScheme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny'}
          </Button>
        </Stack>
      </Drawer>
    </AppShell.Header>
  );
}

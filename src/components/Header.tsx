import { useState, useEffect } from 'react';
import { Burger, Container, Group, AppShell, Tooltip, Button, ActionIcon, useMantineColorScheme, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconTools, IconPhone, IconCurrencyDollar, IconSun, IconMoon, IconQuestionMark, IconDeviceDesktop } from '@tabler/icons-react';
import classes from './Header.module.css';

const services = [
  { id: 'repairs', label: 'Naprawy', icon: <IconTools size={18} /> },
  { id: 'custompc', label: 'Składanie PC', icon: <IconDeviceDesktop size={18} /> },
  { id: 'cennik', label: 'Cennik', icon: <IconCurrencyDollar size={18} /> },
  { id: 'faq', label: 'FAQ', icon: <IconQuestionMark size={18} /> },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState<string | null>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const scrollPosition = window.scrollY + headerHeight + 20;

      // Find which section is currently in view
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

    // Set initial active section
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
    }
    toggle();
  };

  const navItems = services.map((service) => (
    <Tooltip label={service.label} key={service.id} position="bottom" withArrow>
      <Box
        component="a"
        href={`#${service.id}`}
        className={classes.link}
        data-active={active === service.id || undefined}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(service.id);
        }}
        aria-label={service.label}
      >
        {service.icon}
        <span className={classes.linkText}>{service.label}</span>
      </Box>
    </Tooltip>
  ));

  return (
    <AppShell.Header className={classes.header} withBorder={false}>
      <Container size="lg" className={classes.inner}>
        <Group justify="space-between" h="100%" w="100%">
          <MantineLogo 
            size={28} 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActive(null);
            }} 
            className={classes.logo}
          />
          
          <Group gap="md" visibleFrom="sm">
            {navItems}
          </Group>

          <Group gap="sm" visibleFrom="sm">
            <Button 
              variant="filled"
              color="blue"
              radius="xl"
              leftSection={<IconPhone size={16} />}
              onClick={() => scrollToSection('kontakt')}
              className={classes.ctaButton}
            >
              Umów się teraz
            </Button>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={toggleColorScheme}
              aria-label="Toggle theme"
              size="lg"
              className={classes.themeToggle}
            >
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
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
    </AppShell.Header>
  );
}
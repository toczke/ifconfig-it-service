import { IconBrandGithub, IconBrandLinkedin, IconHeart, IconWorld } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, AppShell, Stack } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <AppShell.Footer className={classes.footer}>
      <Container className={classes.inner} size="md">
        <Stack gap="xs">
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" c="dimmed">
              © 2025 Toczek Tomasz. Wszelkie prawa zastrzeżone.
            </Text>
            <Group gap="xs" wrap="nowrap">
              <ActionIcon 
                size="lg" 
                color="gray" 
                variant="subtle" 
                component="a" 
                href="https://github.com/toczke/" 
                target="_blank"
                aria-label="GitHub"
              >
                <IconBrandGithub size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon 
                size="lg" 
                color="gray" 
                variant="subtle" 
                component="a" 
                href="https://www.linkedin.com/in/toczek-tomasz/" 
                target="_blank"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon 
                size="lg" 
                color="gray" 
                variant="subtle" 
                component="a" 
                href="https://tczke.ovh" 
                target="_blank"
                aria-label="Portfolio"
              >
                <IconWorld size={18} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="xs" c="dimmed" ta="center">
            Created with <IconHeart size={12} fill="red" color="red" /> using{' '}
            <Text 
              component="a" 
              href="https://ui.mantine.dev/" 
              target="_blank" 
              c="blue" 
              style={{ textDecoration: 'none' }}
            >
              Mantine
            </Text>
          </Text>
        </Stack>
      </Container>
    </AppShell.Footer>
  );
}
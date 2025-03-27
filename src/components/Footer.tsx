import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconBrandGithub, IconBrandLinkedin, IconHeart } from '@tabler/icons-react';
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
              <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://github.com/TomaszToczek" target="_blank">
                <IconBrandGithub size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://www.linkedin.com/in/tomasz-toczek/" target="_blank">
                <IconBrandLinkedin size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://tczke." target="_blank">
                <IconBrandInstagram size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTwitter size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandYoutube size={18} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="xs" c="dimmed" ta="center">
            Created with <IconHeart size={12} fill="red" color="red" /> using Mantine
          </Text>
        </Stack>
      </Container>
    </AppShell.Footer>
  );
}
import { Container, Text, Title, Stack, Group } from '@mantine/core';
import { IconTools, IconClock, IconShield } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Banner.module.css';

export function Banner() {
  return (
    <div className={classes.banner}>
      
      <Container size="lg" className={classes.container}>
        <Stack align="center" gap="xl">
          <div className={classes.logoWrapper}>
            <MantineLogo size={80} className={classes.logo} />
          </div>

          <Stack gap="xs" align="center" className={classes.textContent}>
            <Title className={classes.title}>
              Sąsiedzki serwis komuterowy
            </Title>
          </Stack>

          <Group className={classes.benefits}>
            <div className={classes.benefitItem}>
              <IconTools size={20} />
              <Text>Ponad 10 lat doświadczenia w IT</Text>
            </div>
            <div className={classes.benefitItem}>
              <IconClock size={20} />
              <Text>Ekspresowe naprawy</Text>
            </div>
            <div className={classes.benefitItem}>
              <IconShield size={20} />
              <Text>Gwarancja zadowolenia</Text>
            </div>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}
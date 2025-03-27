import { Container, Text, Stack, Group } from '@mantine/core';
import { IconTools, IconBrain, IconShield } from '@tabler/icons-react';
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

          <Group className={classes.benefits}>
            <div className={classes.benefitItem}>
              <IconTools size={20} />
              <Text>10+ lat doświadczenia w IT</Text>
            </div>
            <div className={classes.benefitItem}>
              <IconBrain size={20} />
              <Text>Eksperci w swojej dziedzinie</Text>
            </div>
            <div className={classes.benefitItem}>
              <IconShield size={20} />
              <Text>Gwarancja jakości usług</Text>
            </div>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}
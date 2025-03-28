import { Container, Text, Stack, Group } from '@mantine/core';
import { IconTools, IconBrain, IconShield } from '@tabler/icons-react';
import IfconfigLogo from '../../ui/IfconfigLogo/IfconfigLogo';
import classes from './Banner.module.css';

export function Banner() {
  return (
    <div className={classes.banner}>
      <Container size="lg" className={classes.container}>
        <Stack align="center" gap="xl">
          <div className={classes.logoWrapper}>
            <IfconfigLogo 
              width="100%"
              height="100%"
              className={classes.logo} 
              theme="auto" 
            />
          </div>

          <Group className={classes.benefits}>
            <div className={classes.benefitItem}>
              <IconTools size={20} />
              <Text>Lata doświadczenia w IT</Text>
            </div>
            <div className={classes.benefitItem}>
              <IconBrain size={20} />
              <Text>Ekspert w swojej dziedzinie</Text>
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

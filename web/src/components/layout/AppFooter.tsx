import { Container, Text } from '@mantine/core';
import classes from './AppFooter.module.css';

export function AppFooter() {
  return (
    <footer className={classes.footer}>
      <Container fluid className={classes.inner}>
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} Air Quality Simple App
        </Text>
      </Container>
    </footer>
  );
}

import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="md">
        <Title order={1}>404</Title>
        <Text c="dimmed" ta="center">
            Oops! Strona, której szukasz, nie została znaleziona. Możliwe, że URL jest nieprawidłowy.
        </Text>

        <Button component={Link} to="/">
          Wróć na stronę główną
        </Button>
      </Stack>
    </Container>
  );
}

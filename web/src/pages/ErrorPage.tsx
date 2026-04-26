import { Link, useRouteError } from 'react-router-dom';
import { Container, Title, Text, Button, Stack, Group } from '@mantine/core';
import { ArrowsClockwiseIcon, HouseIcon, WarningIcon } from '@phosphor-icons/react';

export function ErrorPage() {
  const error = useRouteError();

  return (
    <Container size="sm" py={80}>
      <Stack align="center" gap="lg">
        <WarningIcon size={64} color="orange" />

        <Title order={2}>Ups... coś poszło nie tak</Title>

        <Text c="dimmed" ta="center" maw={420}>
          Wystąpił nieoczekiwany błąd podczas ładowania strony. Spróbuj odświeżyć lub wrócić na
          stronę główną.
        </Text>

        <Text c="dimmed">{String(error)}</Text>

        <Group mt="md">
          <Button
            leftSection={<ArrowsClockwiseIcon size={16} />}
            variant="light"
            onClick={() => window.location.reload()}
          >
            Odśwież
          </Button>

          <Button component={Link} to="/" leftSection={<HouseIcon size={16} />}>
            Strona główna
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

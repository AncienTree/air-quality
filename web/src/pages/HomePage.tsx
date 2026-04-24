import { Container, Title, Text, Card, Stack, Group, Badge } from '@mantine/core';

export function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Air Quality Dashboard</Title>
          <Text c="dimmed" mt="sm">
            A simple demo project for recruitment purposes showcasing backend + frontend integration.
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="sm">
            <Group>
              <Badge color="blue">Demo Project</Badge>
              <Badge color="gray">Recruitment</Badge>
              <Badge color="teal">React + Spring Boot</Badge>
            </Group>

            <Text>
              This application displays air quality measurements grouped by cities. It demonstrates REST API design,
              data aggregation, and a modern React dashboard UI.
            </Text>

            <Text>
              Users can browse city-level air quality data, inspect historical measurements, and analyze pollution
              trends (PM10, CO, NO2).
            </Text>

            <Text>
              Additionally, users can create and manage notes related to cities for better context and data
              interpretation.
            </Text>

            <Text fw={500}>Navigation is available via the top navigation bar for quick access to all sections.</Text>

            <Text>
              Author: <b>Mateusz Dąbek</b>
            </Text>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Features</Title>
          <ul>
            <li>View cities with latest air quality metrics</li>
            <li>Inspect historical measurements per city</li>
            <li>Analyze pollution trends (PM10, CO, NO2)</li>
            <li>Create and manage notes for each city</li>
            <li>Navigate easily using the top navigation bar</li>
          </ul>
        </Card>
      </Stack>
    </Container>
  );
}

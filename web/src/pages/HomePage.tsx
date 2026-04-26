import { Container, Title, Text, Card, Stack, Group, Badge } from '@mantine/core';

export function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Panel jakości powietrza</Title>
          <Text c="dimmed" mt="sm">
            Prosty projekt demonstracyjny na potrzeby rekrutacji, prezentujący integrację backendu i
            frontendu.
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
              Ta aplikacja wyświetla pomiary jakości powietrza pogrupowane według miast. Demonstruje
              projektowanie REST API, agregację danych oraz nowoczesny interfejs dashboardu w React.
            </Text>

            <Text>
              Użytkownicy mogą przeglądać dane dotyczące jakości powietrza na poziomie miast,
              analizować pomiary historyczne oraz badać trendy zanieczyszczeń (PM10, CO, NO2).
            </Text>

            <Text>
              Dodatkowo użytkownicy mogą tworzyć i zarządzać notatkami powiązanymi z miastami, co
              ułatwia kontekstualizację i interpretację danych.
            </Text>

            <Text fw={500}>
              Nawigacja jest dostępna za pomocą górnego paska, zapewniając szybki dostęp do
              wszystkich sekcji.
            </Text>

            <Text>
              Autor: <b>Mateusz Dąbek</b>
            </Text>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Funkcje</Title>
          <ul>
            <li>Przeglądaj miasta z najnowszymi wskaźnikami jakości powietrza</li>
            <li>Analizuj historyczne pomiary dla każdego miasta</li>
            <li>Badaj trendy zanieczyszczeń (PM10, CO, NO2)</li>
            <li>Twórz i zarządzaj notatkami dla poszczególnych miast</li>
            <li>Nawiguj łatwo za pomocą górnego paska nawigacyjnego</li>
          </ul>
        </Card>
      </Stack>
    </Container>
  );
}

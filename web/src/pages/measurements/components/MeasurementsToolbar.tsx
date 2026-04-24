import { Card, Container, Input } from '@mantine/core';

export function MeasurementsToolbar() {
  return (
    <Container p="md" fluid>
      <Card withBorder radius="md" p="md">
        <Input size="lg" placeholder="Search by city or region" variant="filled"/>
      </Card>
    </Container>
  );
}

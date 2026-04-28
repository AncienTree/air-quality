import { Card, Container, Input } from '@mantine/core';

type MeasurementsToolbarProps = {
  search: string;
  onChange: (val: string) => void;
};

export function MeasurementsToolbar({ search, onChange }: MeasurementsToolbarProps) {
  return (
    <Container p="md" fluid>
      <Card withBorder radius="md" p="md">
        <Input
          size="lg"
          placeholder="Wyszukaj według miasta lub kraju"
          variant="filled"
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
      </Card>
    </Container>
  );
}

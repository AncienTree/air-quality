import { Button, Center, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

export type TableActionButtonProps = {
  cityId: string;
};

// TODO add actions
export function TableActionButton({ cityId }: TableActionButtonProps) {
  return (
    <Center>
      <Group>
        <Button size="xs" variant="light" component={Link} to={`/notes/${cityId}`}>
          Notatki
        </Button>
        <Button size="xs" variant="light" component={Link} to={`/measurements/${cityId}`}>
          Szczegóły
        </Button>
      </Group>
    </Center>
  );
}

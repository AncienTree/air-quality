import { Button, Center, Group } from '@mantine/core';

export type TableActionButtonProps = {
  cityId: string;
};

// TODO add actions
export function TableActionButton({ cityId }: TableActionButtonProps) {
  return (
    <Center>
      <Group>
        <Button size="xs" variant="light">
          Notatki
        </Button>
        <Button size="xs" variant="light">
          Szczegóły
        </Button>
      </Group>
    </Center>
  );
}

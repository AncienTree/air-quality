import { Stack, Text } from '@mantine/core';

type TableHeaderStatsProps = {
  title: string;
  subtitle?: string;
};

export function TableHeaderStats({ title, subtitle }: TableHeaderStatsProps) {
  return (
    <Stack gap={0} justify="flex-start" align='center' h={40}>
      <Text fw={600} size="sm">
        {title}
      </Text>
      <Text size="xs" c="dimmed">
        {subtitle ?? ''}
      </Text>
    </Stack>
  );
}

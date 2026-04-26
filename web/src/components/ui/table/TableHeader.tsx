import { Stack, Text } from '@mantine/core';

type TableHeaderStatsProps = {
  title: string;
  subtitle?: string;
  align?: string;
};

export function TableHeaderStats({ title, subtitle, align = 'left' }: TableHeaderStatsProps) {
  return (
    <Stack gap={0} justify="flex-start" align={align} h={35}>
      <Text fw={600} size="sm">
        {title}
      </Text>
      <Text size="xs" c="dimmed">
        {subtitle ?? ''}
      </Text>
    </Stack>
  );
}

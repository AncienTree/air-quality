import { Box, Group } from '@mantine/core';
import { getColor } from '../../../utils/pm10Colors';

type TableCityRowProps = {
  city: string;
  pm10: number;
  showColors?: boolean;
};

export function TableCityRow({ city, pm10, showColors = false }: TableCityRowProps) {
  return (
    <Group gap="xs">
      {showColors && (
        <Box w={8} h={8} style={{ borderRadius: '50%', background: getColor(pm10) }} />
      )}
      {city}
    </Group>
  );
}

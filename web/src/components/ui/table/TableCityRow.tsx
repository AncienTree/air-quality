import { Box, Group } from '@mantine/core';
import { getColor } from '../../../utils/pm10Colors';
import { useStatsStore } from '../../../stores/useStatsStore';
import { useMemo } from 'react';

type TableCityRowProps = {
  city: string;
  pm10: number;
  showColors: boolean;
};

export function TableCityRow({ city, pm10, showColors = false }: TableCityRowProps) {
  const { cities } = useStatsStore();

  const cityData = useMemo(() => cities?.find((c) => c.id === city), [cities, city]);
  const cityName = cityData?.city ?? 'Nieznane miasto';

  return (
    <Group gap="xs">
      {showColors && (
        <Box w={8} h={8} style={{ borderRadius: '50%', background: getColor(pm10) }} />
      )}
      {cityName}
    </Group>
  );
}

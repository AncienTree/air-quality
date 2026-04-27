import { Box, Card, Center, Group, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useStatsStore } from '../../stores/useStatsStore';
import { useMemo } from 'react';
import { useCityStats } from '../../hooks/useCityStats';
import { MeasurementsDetailsTable } from './components/MeasurementsDetailsTable';

export function MeasurementDetailsPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useCityStats(id);

  const { cities } = useStatsStore();
  const cityData = useMemo(() => cities?.find((c) => c.id === id), [cities, id]);

  return (
    <Box p="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
        <Group justify="space-between">
          <Title>Szczegółowe pomiary dla miasta {cityData?.city}</Title>
        </Group>
      </Card>

      <>
        {isError && (
          <Center>
            <Text c="red">Wystąpił błąd podczas pobierania pomiarów</Text>
          </Center>
        )}

        {!isError && <MeasurementsDetailsTable data={data?.data} isLoading={isLoading} city={cityData} />}
      </>
    </Box>
  );
}

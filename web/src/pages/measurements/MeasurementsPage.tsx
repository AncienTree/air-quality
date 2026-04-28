import { useEffect, useState } from 'react';
import { MeasurementsHeader } from './components/MeasurementsHeader';
import { MeasurementsTable } from './components/MeasurementsTable';
import { MeasurementsToolbar } from './components/MeasurementsToolbar';
import { RangeTime } from '../../types/rangeTime';
import { useCitiesStats } from '../../hooks/useCitiesStats';
import { useCities } from '../../hooks/useCities';
import { useStatsStore } from '../../stores/useStatsStore';
import { useDebouncedValue } from '@mantine/hooks';

export function MeasurementsPage() {
  const [range, setRange] = useState<string>(RangeTime.ONE_HOUR);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  // Api calls
  const { data: cities, isLoading: isCityLoading } = useCities();
  const { data, isLoading } = useCitiesStats(range, debouncedSearch);

  const { setCities } = useStatsStore();

  useEffect(() => {
    if (cities?.status === 'OK' && cities?.data?.length > 0) {
      setCities(cities.data);
    }
  }, [cities]);

  return (
    <>
      <MeasurementsHeader range={range} onChange={setRange} />

      <MeasurementsToolbar search={search} onChange={setSearch}/>

      <MeasurementsTable data={data?.data} isLoading={isLoading || isCityLoading} />
    </>
  );
}

import { useState } from 'react';
import { MeasurementsHeader } from './components/MeasurementsHeader';
import { MeasurementsTable } from './components/MeasurementsTable';
import { MeasurementsToolbar } from './components/MeasurementsToolbar';
import { RangeTime } from '../../types/rangeTime';
import { useCityStats } from '../../hooks/useCityStats';

export function MeasurementsPage() {
  const [range, setRange] = useState(RangeTime.THREE_MONTHS);
  const { data, isLoading } = useCityStats(range);
  
  return (
    <>
      <MeasurementsHeader range={range} onChange={setRange} />

      <MeasurementsToolbar />

      <MeasurementsTable data={data?.data} isLoading={isLoading} />
    </>
  );
}

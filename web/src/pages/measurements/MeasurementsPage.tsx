import { useState } from 'react';
import { MeasurementsHeader } from './components/MeasurementsHeader';
import { MeasurementsTable } from './components/MeasurementsTable';
import { MeasurementsToolbar } from './components/MeasurementsToolbar';
import { RangeTime } from '../../types/rangeTime';

export function MeasurementsPage() {
  const [range, setRange] = useState(RangeTime.ONE_HOUR);
  return (
    <>
      <MeasurementsHeader range={range} onChange={setRange} />

      <MeasurementsToolbar />

      <MeasurementsTable />
    </>
  );
}

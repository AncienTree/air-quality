import { useParams } from 'react-router-dom';

export function MeasurementDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Measurement Details {id}</h1>
      {/* TODO add details */}
    </div>
  );
}

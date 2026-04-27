import { Text } from '@mantine/core';

type TableMeasurementRowProps = {
  avgScore: number;
  minScore?: number;
  maxScore?: number;
};

export function TableMeasurementRow({
  avgScore = 0,
  minScore,
  maxScore,
}: TableMeasurementRowProps) {
  const notMaxMinScore = !minScore && !maxScore;

  return (
    <Text>
      {avgScore.toFixed(2)}{' '}
      {!notMaxMinScore && (
        <Text span c="dimmed" size="xs">
          / {minScore?.toFixed(2)} / {maxScore?.toFixed(2)}
        </Text>
      )}
    </Text>
  );
}

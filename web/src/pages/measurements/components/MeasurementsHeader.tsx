import { Container, Group, SegmentedControl, Text } from '@mantine/core';
import { RangeTime } from '../../../types/rangeTime';

const RANGE_OPTIONS = [
  { label: '1H', value: RangeTime.ONE_HOUR },
  { label: '24H', value: RangeTime.TWENTY_FOUR_HOURS },
  { label: '3M', value: RangeTime.THREE_MONTHS },
];

type MeasurementsHeaderProps = {
  range: string;
  onChange: (value: string) => void;
};

export function MeasurementsHeader({ range, onChange }: MeasurementsHeaderProps) {
  return (
    <Container fluid p="lg">
      <Group justify="space-between" align='center'>
        <div>
          <Text size="xl" fw={700}>
            Measurement results
          </Text>

          <Text size="sm" fs="">
            Detailed analysis of air quality.
          </Text>
        </div>

        <SegmentedControl value={range} onChange={onChange} data={RANGE_OPTIONS} color="blue" bg="white" />
      </Group>
    </Container>
  );
}

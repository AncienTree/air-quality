import { Text } from '@mantine/core';
import { format } from 'date-fns';

type TableTimestampRowProps = {
  timestamp: number;
};

export function TableTimestampRow({ timestamp }: TableTimestampRowProps) {
    const createdDate = format(new Date(timestamp), 'yyyy-MM-dd HH:mm');

  return <Text>{createdDate}</Text>;
}

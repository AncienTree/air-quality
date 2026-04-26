import { Text } from '@mantine/core';

type TableRegionRowProps = {
  region: string;
};

// TODO from store map region to full name
export function TableRegionRow({ region }: TableRegionRowProps) {
  return <Text>{region}</Text>;
}

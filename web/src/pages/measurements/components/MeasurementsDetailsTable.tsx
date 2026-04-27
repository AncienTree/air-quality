import { Box, Card, ScrollArea, Table, Text } from '@mantine/core';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { City, CityStats } from '../../../types/cityStats';
import { LoadingComponent } from '../../../components/ui/LoadingComponent';
import { TableCityRow } from '../../../components/ui/table/TableCityRow';
import { TableHeaderStats } from '../../../components/ui/table/TableHeader';
import { TableMeasurementRow } from '../../../components/ui/table/TableMeasurementRow';
import { TableTimestampRow } from '../../../components/ui/table/TableTimestampRow';

type MeasurementsTableProps = {
  data: CityStats[];
  city: City | undefined;
  isLoading: boolean;
};

export function MeasurementsDetailsTable({ data, city, isLoading }: MeasurementsTableProps) {
  const columns: ColumnDef<CityStats>[] = [
    {
      accessorKey: 'city',
      header: () => <TableHeaderStats title="Miasto" />,
      cell: ({ row }) => (
        <TableCityRow city={row.original?.cityId} pm10={row.original?.PM10} showColors />
      ),
    },
    {
      accessorKey: 'country',
      header: () => <TableHeaderStats title="Kraj" />,
      cell: () => <Text>{city?.country ?? 'UNK'}</Text>,
    },
    {
      accessorKey: 'region',
      header: () => <TableHeaderStats title="Region" />,
      cell: () => <Text>{city?.region ?? 'UNK'}</Text>,
    },
    {
      id: 'pm10',
      header: () => <TableHeaderStats title="PM10" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.PM10} />,
    },
    {
      id: 'co',
      header: () => <TableHeaderStats title="CO" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.CO} />,
    },
    {
      id: 'no2',
      header: () => <TableHeaderStats title="NO2" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.NO2} />,
    },
    {
      id: 'timestamp',
      header: () => <TableHeaderStats title="Data rekordu" />,
      cell: ({ row }) => <TableTimestampRow timestamp={row.original?.timestamp} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box p="md">
      <Card shadow="sm" radius="md" withBorder>
        <ScrollArea h="70vh">
          <Table
            stickyHeader
            highlightOnHover
            withTableBorder
            striped
            style={{ tableLayout: 'fixed' }}
          >
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>

            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}

              {table.getRowModel().rows.length === 0 && !isLoading && (
                <Table.Tr>
                  <Table.Td colSpan={columns.length} align="center">
                    <Text color="dimmed">Brak danych do wyświetlenia</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Box>
  );
}

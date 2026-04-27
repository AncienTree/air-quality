import { Card, ScrollArea, Table, Text } from '@mantine/core';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { CityStats } from '../../../types/cityStats';
import { LoadingComponent } from '../../../components/ui/LoadingComponent';
import { TableCityRow } from '../../../components/ui/table/TableCityRow';
import { TableHeaderStats } from '../../../components/ui/table/TableHeader';
import { TableMeasurementRow } from '../../../components/ui/table/TableMeasurementRow';
import { TableActionButton } from '../../../components/ui/table/TableActionButton';

type MeasurementsTableProps = {
  data: CityStats[];
  isLoading: boolean;
  showColors?: boolean;
};

export function MeasurementsTable({ data, isLoading, showColors = false }: MeasurementsTableProps) {
  const columns: ColumnDef<CityStats>[] = [
    {
      accessorKey: 'city',
      header: () => <TableHeaderStats title="Miasto" />,
      cell: ({ row }) => (
        <TableCityRow
          city={row.original?.cityId}
          pm10={row.original?.avgPM10}
          showColors={showColors}
        />
      ),
    },
    {
      accessorKey: 'country',
      header: () => <TableHeaderStats title="Kraj" />,
    },
    {
      id: 'pm10',
      header: () => <TableHeaderStats title="PM10" subtitle="śr. / min / max" />,
      cell: ({ row }) => (
        <TableMeasurementRow
          avgScore={row.original?.avgPM10}
          minScore={row.original?.minPM10}
          maxScore={row?.original?.maxPM10}
        />
      ),
    },
    {
      id: 'co',
      header: () => <TableHeaderStats title="CO" subtitle="śr. / min / max" />,
      cell: ({ row }) => (
        <TableMeasurementRow
          avgScore={row.original?.avgCO}
          minScore={row.original?.minCO}
          maxScore={row?.original?.minCO}
        />
      ),
    },
    {
      id: 'no2',
      header: () => <TableHeaderStats title="NO2" subtitle="śr. / min / max" />,
      cell: ({ row }) => (
        <TableMeasurementRow
          avgScore={row.original?.avgNO2}
          minScore={row.original?.minNO2}
          maxScore={row?.original?.maxNO2}
        />
      ),
    },
    {
      id: 'actions',
      header: () => <TableHeaderStats title="Akcje" align='center' />,
      cell: ({ row }) => <TableActionButton cityId={row.original?.cityId} />,
      enableResizing: false,
      size: 100,
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
    <ScrollArea p="md">
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Table highlightOnHover withTableBorder striped style={{ tableLayout: 'fixed' }}>
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
      </Card>
    </ScrollArea>
  );
}

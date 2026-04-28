import { Box, Card, Group, ScrollArea, Table, Text } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { CityAvgStats } from '../../../types/cityStats';
import { LoadingComponent } from '../../../components/ui/LoadingComponent';
import { TableCityRow } from '../../../components/ui/table/TableCityRow';
import { TableHeaderStats } from '../../../components/ui/table/TableHeader';
import { TableMeasurementRow } from '../../../components/ui/table/TableMeasurementRow';
import { TableActionButton } from '../../../components/ui/table/TableActionButton';
import { useStatsStore } from '../../../stores/useStatsStore';
import { useState } from 'react';
import { SortAscendingIcon, SortDescendingIcon, FunnelSimpleIcon } from '@phosphor-icons/react';

type MeasurementsTableProps = {
  data: CityAvgStats[];
  isLoading: boolean;
};

export function MeasurementsTable({ data, isLoading }: MeasurementsTableProps) {
  const { citiesMap } = useStatsStore();

  const [sorting, setSorting] = useState<SortingState>([{ id: 'city', desc: false }]);

  const columns: ColumnDef<CityAvgStats>[] = [
    {
      accessorKey: 'city',
      header: () => <TableHeaderStats title="Miasto" />,
      accessorFn: (row) => citiesMap[row.cityId]?.city ?? '',
      cell: ({ row }) => (
        <TableCityRow
          city={citiesMap[row.original?.cityId]?.city ?? 'Nieznane Miasto'}
          pm10={row.original?.avgPM10}
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
      accessorFn: (row) => row.avgPM10,
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
      accessorFn: (row) => row.avgCO,
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
      accessorFn: (row) => row.avgNO2,
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
      header: () => <TableHeaderStats title="Akcje" align="center" />,
      cell: ({ row }) => <TableActionButton cityId={row.original?.cityId} />,
      enableResizing: false,
      size: 100,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                  {headerGroup.headers.map((header) => {
                    const isAction = header.id === 'actions';
                    const sort = header.column.getIsSorted();
                    return (
                      <Table.Th
                        key={header.id}
                        style={{ cursor: isAction ? 'default' : 'pointer' }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Group align="flex-start">
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.getCanSort() && (
                            <>
                              {sort === 'asc' && <SortAscendingIcon size={14} />}
                              {sort === 'desc' && <SortDescendingIcon size={14} />}
                              {sort === false && <FunnelSimpleIcon size={14} />}
                            </>
                          )}
                        </Group>
                      </Table.Th>
                    );
                  })}
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

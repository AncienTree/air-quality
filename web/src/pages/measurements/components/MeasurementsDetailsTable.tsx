import { Card, Group, ScrollArea, Table, Text } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { City, CityStats } from '../../../types/cityStats';
import { LoadingComponent } from '../../../components/ui/LoadingComponent';
import { TableCityRow } from '../../../components/ui/table/TableCityRow';
import { TableHeaderStats } from '../../../components/ui/table/TableHeader';
import { TableMeasurementRow } from '../../../components/ui/table/TableMeasurementRow';
import { TableTimestampRow } from '../../../components/ui/table/TableTimestampRow';
import { useStatsStore } from '../../../stores/useStatsStore';
import { useState } from 'react';
import { FunnelSimpleIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';

type MeasurementsTableProps = {
  data: CityStats[];
  city: City | undefined;
  isLoading: boolean;
};

export function MeasurementsDetailsTable({ data, city, isLoading }: MeasurementsTableProps) {
  const { citiesMap } = useStatsStore();

  const [sorting, setSorting] = useState<SortingState>([{ id: 'timestamp', desc: false }]);

  const columns: ColumnDef<CityStats>[] = [
    {
      accessorKey: 'city',
      header: () => <TableHeaderStats title="Miasto" />,
      enableSorting: false,
      cell: ({ row }) => (
        <TableCityRow
          city={citiesMap[row.original?.cityId]?.city ?? 'Nieznane Miasto'}
          pm10={row.original?.PM10}
          showColors
        />
      ),
    },
    {
      accessorKey: 'country',
      header: () => <TableHeaderStats title="Kraj" />,
      cell: () => <Text>{city?.country ?? 'UNK'}</Text>,
      enableSorting: false,
    },
    {
      accessorKey: 'region',
      header: () => <TableHeaderStats title="Region" />,
      cell: () => <Text>{city?.region ?? 'UNK'}</Text>,
      enableSorting: false,
    },
    {
      id: 'pm10',
      header: () => <TableHeaderStats title="PM10" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.PM10} />,
      accessorFn: (row) => row.PM10,
    },
    {
      id: 'co',
      header: () => <TableHeaderStats title="CO" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.CO} />,
      accessorFn: (row) => row.CO,
    },
    {
      id: 'no2',
      header: () => <TableHeaderStats title="NO2" />,
      cell: ({ row }) => <TableMeasurementRow avgScore={row.original?.NO2} />,
      accessorFn: (row) => row.NO2,
    },
    {
      id: 'timestamp',
      header: () => <TableHeaderStats title="Data rekordu" />,
      cell: ({ row }) => <TableTimestampRow timestamp={row.original?.timestamp} />,
      accessorFn: (row) => new Date(row.timestamp).toLocaleString()
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
  );
}

'use client';

import { Table, Pagination, Text, Group, Card, Loader, Center } from '@mantine/core';
import { ReactNode } from 'react';
import { PaginationMeta } from '@/types';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
  }[];
  pagination?: PaginationMeta;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pagination,
  onPageChange,
  loading = false,
  emptyMessage = 'No data available',
  ...tableProps
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text c="dimmed" ta="center" py="xl" size="lg">
          {emptyMessage}
        </Text>
      </Card>
    );
  }

  return (
    <>
      <Card shadow="sm" padding={0} radius="md" withBorder style={{ overflow: 'hidden' }}>
        <Table
          {...tableProps}
          highlightOnHover
          styles={{
            thead: {
              backgroundColor: 'var(--mantine-color-gray-0)',
            },
            th: {
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'var(--mantine-font-size-xs)',
              letterSpacing: '0.5px',
              color: 'var(--mantine-color-gray-7)',
              borderBottom: '2px solid var(--mantine-color-gray-2)',
            },
            tr: {
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'var(--mantine-color-gray-0)',
              },
            },
            td: {
              borderBottom: '1px solid var(--mantine-color-gray-1)',
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((column) => (
                <Table.Th key={column.key}>{column.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item) => (
              <Table.Tr key={item.id}>
                {columns.map((column) => (
                  <Table.Td key={column.key}>
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {pagination && pagination.totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={pagination.totalPages}
            value={pagination.page}
            onChange={onPageChange}
            radius="md"
            size="sm"
            withEdges
          />
        </Group>
      )}
    </>
  );
}


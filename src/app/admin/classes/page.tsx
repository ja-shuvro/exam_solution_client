'use client';

import { Container, Title, Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from '@/components/common';
import { useClasses, useDeleteClass } from '@/hooks/use-classes';
import { useState } from 'react';
import { Class } from '@/types';
import { formatDate } from '@/utils';
import { ConfirmDialog } from '@/components/common';

export default function ClassesPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useClasses({ page, limit: 10 });
  const deleteMutation = useDeleteClass();

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
        },
      });
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'created_at',
      label: 'Created At',
      render: (item: Class) => formatDate(item.created_at),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: Class) => (
        <Group gap="xs">
          <Button size="sm" variant="light" radius="md">
            Edit
          </Button>
          <Button
            size="sm"
            variant="light"
            color="red"
            onClick={() => handleDelete(item.id as string)}
            radius="md"
          >
            Delete
          </Button>
        </Group>
      ),
    },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2} fw={800} style={{ letterSpacing: '-0.5px' }}>
              Classes
            </Title>
            <Text c="dimmed" mt="xs" size="sm">
              Manage and organize your classes
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={18} />}
            size="md"
            radius="md"
            style={{
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            Create Class
          </Button>
        </Group>

        <DataTable
          data={data?.data || []}
          columns={columns}
          pagination={data?.meta}
          onPageChange={setPage}
          loading={isLoading}
        />

        <ConfirmDialog
          opened={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          title="Delete Class"
          message="Are you sure you want to delete this class? This action cannot be undone."
          loading={deleteMutation.isPending}
        />
      </Stack>
    </Container>
  );
}


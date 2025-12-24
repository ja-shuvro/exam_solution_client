'use client';

import { Container, Title, Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from '@/components/common';
import { useSubjects, useDeleteSubject } from '@/hooks';
import { useState } from 'react';
import { Subject } from '@/types';
import { formatDate } from '@/utils';
import { ConfirmDialog } from '@/components/common';

export default function SubjectsPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useSubjects({ page, limit: 10 });
  const deleteMutation = useDeleteSubject();

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
      render: (item: Subject) => formatDate(item.created_at),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: Subject) => (
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
              Subjects
            </Title>
            <Text c="dimmed" mt="xs" size="sm">
              Manage and organize your subjects
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
            Create Subject
          </Button>
        </Group>

        <DataTable
          data={data?.data || []}
          columns={columns}
          pagination={data?.meta}
          onPageChange={setPage}
          loading={isLoading}
          emptyMessage="No subjects found"
        />

        <ConfirmDialog
          opened={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          title="Delete Subject"
          message="Are you sure you want to delete this subject? This action cannot be undone."
          loading={deleteMutation.isPending}
        />
      </Stack>
    </Container>
  );
}


'use client';

import { Container, Title, Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from '@/components/common';

export default function QuestionSetsPage() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2} fw={800} style={{ letterSpacing: '-0.5px' }}>
              Question Sets
            </Title>
            <Text c="dimmed" mt="xs" size="sm">
              Manage and organize your question sets
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
            Create Question Set
          </Button>
        </Group>

        <DataTable
          data={[]}
          columns={columns}
          loading={false}
          emptyMessage="No question sets found"
        />
      </Stack>
    </Container>
  );
}


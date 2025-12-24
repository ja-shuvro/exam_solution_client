'use client';

import { Container, Title, Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from '@/components/common';
import { useChapters, useDeleteChapter } from '@/hooks';
import { useState } from 'react';
import { Chapter } from '@/types';
import { formatDate } from '@/utils';
import { ConfirmDialog } from '@/components/common';

export default function ChaptersPage() {
    const [page, setPage] = useState(1);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { data, isLoading } = useChapters({ page, limit: 10 });
    const deleteMutation = useDeleteChapter();

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
            key: 'subject',
            label: 'Subject',
            render: (item: Chapter) => (
                <Text size="sm" fw={500}>
                    {item.subject?.name || 'N/A'}
                </Text>
            ),
        },
        {
            key: 'class',
            label: 'Class',
            render: (item: Chapter) => {
                // Get the first class name from the classes array
                const className = item.classes?.[0]?.name;
                // If multiple classes, show them all
                const allClasses = item.classes?.map(c => c.name).join(', ') || 'N/A';
                return (
                    <Text size="sm" fw={500}>
                        {allClasses}
                    </Text>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Created At',
            render: (item: Chapter) => formatDate(item.created_at),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item: Chapter) => (
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
                            Chapters
                        </Title>
                        <Text c="dimmed" mt="xs" size="sm">
                            Manage and organize your chapters
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
                        Create Chapter
                    </Button>
                </Group>

                <DataTable
                    data={data?.data || []}
                    columns={columns}
                    pagination={data?.meta}
                    onPageChange={setPage}
                    loading={isLoading}
                    emptyMessage="No chapters found"
                />

                <ConfirmDialog
                    opened={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                    title="Delete Chapter"
                    message="Are you sure you want to delete this chapter? This action cannot be undone."
                    loading={deleteMutation.isPending}
                />
            </Stack>
        </Container>
    );
}


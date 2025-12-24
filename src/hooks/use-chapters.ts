import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chaptersService } from '@/services';
import { QueryParams, Chapter } from '@/types';
import { notifications } from '@mantine/notifications';

const QUERY_KEYS = {
    all: ['chapters'] as const,
    lists: () => [...QUERY_KEYS.all, 'list'] as const,
    list: (params?: QueryParams) => [...QUERY_KEYS.lists(), params] as const,
    details: () => [...QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
};

export function useChapters(params?: QueryParams) {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => chaptersService.getAll(params),
    });
}

export function useChapter(id: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id!),
        queryFn: () => chaptersService.getById(id!),
        enabled: !!id,
    });
}

export function useCreateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: chaptersService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
            notifications.show({
                title: 'Success',
                message: 'Chapter created successfully',
                color: 'green',
            });
        },
        onError: (error: any) => {
            notifications.show({
                title: 'Error',
                message: Array.isArray(error.message) ? error.message[0] : error.message,
                color: 'red',
            });
        },
    });
}

export function useUpdateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string; subject_id: string }> }) =>
            chaptersService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            notifications.show({
                title: 'Success',
                message: 'Chapter updated successfully',
                color: 'green',
            });
        },
        onError: (error: any) => {
            notifications.show({
                title: 'Error',
                message: Array.isArray(error.message) ? error.message[0] : error.message,
                color: 'red',
            });
        },
    });
}

export function useDeleteChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: chaptersService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
            notifications.show({
                title: 'Success',
                message: 'Chapter deleted successfully',
                color: 'green',
            });
        },
        onError: (error: any) => {
            notifications.show({
                title: 'Error',
                message: Array.isArray(error.message) ? error.message[0] : error.message,
                color: 'red',
            });
        },
    });
}


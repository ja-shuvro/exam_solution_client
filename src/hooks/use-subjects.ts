import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectsService } from '@/services';
import { QueryParams, Subject } from '@/types';
import { notifications } from '@mantine/notifications';

const QUERY_KEYS = {
  all: ['subjects'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (params?: QueryParams) => [...QUERY_KEYS.lists(), params] as const,
  details: () => [...QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  chapters: (id: string) => [...QUERY_KEYS.detail(id), 'chapters'] as const,
};

export function useSubjects(params?: QueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => subjectsService.getAll(params),
  });
}

export function useSubject(id: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id!),
    queryFn: () => subjectsService.getById(id!),
    enabled: !!id,
  });
}

export function useSubjectChapters(subjectId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.chapters(subjectId!),
    queryFn: () => subjectsService.getChapters(subjectId!),
    enabled: !!subjectId,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subjectsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      notifications.show({
        title: 'Success',
        message: 'Subject created successfully',
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

export function useUpdateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string }> }) =>
      subjectsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      notifications.show({
        title: 'Success',
        message: 'Subject updated successfully',
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

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subjectsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      notifications.show({
        title: 'Success',
        message: 'Subject deleted successfully',
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


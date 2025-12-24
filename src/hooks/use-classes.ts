import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classesService } from '@/services';
import { QueryParams, Class } from '@/types';
import { notifications } from '@mantine/notifications';

const QUERY_KEYS = {
  all: ['classes'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (params?: QueryParams) => [...QUERY_KEYS.lists(), params] as const,
  details: () => [...QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  subjects: (id: string) => [...QUERY_KEYS.detail(id), 'subjects'] as const,
  chapters: (id: string) => [...QUERY_KEYS.detail(id), 'chapters'] as const,
};

export function useClasses(params?: QueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => classesService.getAll(params),
  });
}

export function useClass(id: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id!),
    queryFn: () => classesService.getById(id!),
    enabled: !!id,
  });
}

export function useClassSubjects(classId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.subjects(classId!),
    queryFn: () => classesService.getSubjects(classId!),
    enabled: !!classId,
  });
}

export function useClassChapters(classId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.chapters(classId!),
    queryFn: () => classesService.getChapters(classId!),
    enabled: !!classId,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      notifications.show({
        title: 'Success',
        message: 'Class created successfully',
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

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string }> }) =>
      classesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      notifications.show({
        title: 'Success',
        message: 'Class updated successfully',
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

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      notifications.show({
        title: 'Success',
        message: 'Class deleted successfully',
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


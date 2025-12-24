import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import { Class, PaginatedResponse, QueryParams, Chapter } from '@/types';

export const classesService = {
  getAll: async (params?: QueryParams) => {
    return apiClient.get<Class[]>(API_ENDPOINTS.CLASSES, { params });
  },

  getById: async (id: string) => {
    return apiClient.get<Class>(`${API_ENDPOINTS.CLASSES}/${id}`);
  },

  getSubjects: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.CLASSES}/${id}/subjects`);
  },

  getChapters: async (id: string) => {
    return apiClient.get<Chapter[]>(`${API_ENDPOINTS.CLASSES}/${id}/chapters`);
  },

  create: async (data: { name: string }) => {
    return apiClient.post<Class>(API_ENDPOINTS.CLASSES, data);
  },

  update: async (id: string, data: Partial<{ name: string }>) => {
    return apiClient.patch<Class>(`${API_ENDPOINTS.CLASSES}/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`${API_ENDPOINTS.CLASSES}/${id}`);
  },
};


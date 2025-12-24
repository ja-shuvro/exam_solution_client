import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import { Subject, QueryParams, PaginatedResponse } from '@/types';

export const subjectsService = {
  getAll: async (params?: QueryParams) => {
    return apiClient.get<Subject[]>(API_ENDPOINTS.SUBJECTS, { params });
  },

  getById: async (id: string) => {
    return apiClient.get<Subject>(`${API_ENDPOINTS.SUBJECTS}/${id}`);
  },

  getChapters: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.SUBJECTS}/${id}/chapters`);
  },

  create: async (data: { name: string }) => {
    return apiClient.post<Subject>(API_ENDPOINTS.SUBJECTS, data);
  },

  update: async (id: string, data: Partial<{ name: string }>) => {
    return apiClient.patch<Subject>(`${API_ENDPOINTS.SUBJECTS}/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`${API_ENDPOINTS.SUBJECTS}/${id}`);
  },
};


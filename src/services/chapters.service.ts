import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import { Chapter, QueryParams } from '@/types';

export const chaptersService = {
  getAll: async (params?: QueryParams) => {
    return apiClient.get<Chapter[]>(API_ENDPOINTS.CHAPTERS, { params });
  },

  getById: async (id: string) => {
    return apiClient.get<Chapter>(`${API_ENDPOINTS.CHAPTERS}/${id}`);
  },

  create: async (data: { name: string; subject_id: string }) => {
    return apiClient.post<Chapter>(API_ENDPOINTS.CHAPTERS, data);
  },

  update: async (id: string, data: Partial<{ name: string; subject_id: string }>) => {
    return apiClient.patch<Chapter>(`${API_ENDPOINTS.CHAPTERS}/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`${API_ENDPOINTS.CHAPTERS}/${id}`);
  },
};


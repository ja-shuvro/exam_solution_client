import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import { Question, QueryParams, QuestionType, MCQMeta, SQMeta, CQMeta } from '@/types';

export interface CreateQuestionData {
  type: QuestionType;
  total_mark: number;
  class_subject_id: string;
  chapter_id: string;
  mcq_meta?: MCQMeta;
  sq_meta?: SQMeta;
  cq_meta?: CQMeta;
}

export const questionsService = {
  getAll: async (params?: QueryParams) => {
    return apiClient.get<Question[]>(API_ENDPOINTS.QUESTIONS, { params });
  },

  getById: async (id: string) => {
    return apiClient.get<Question>(`${API_ENDPOINTS.QUESTIONS}/${id}`);
  },

  getMeta: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.QUESTIONS}/${id}/meta`);
  },

  create: async (data: CreateQuestionData) => {
    return apiClient.post<Question>(API_ENDPOINTS.QUESTIONS, data);
  },

  update: async (id: string, data: Partial<CreateQuestionData>) => {
    return apiClient.patch<Question>(`${API_ENDPOINTS.QUESTIONS}/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`${API_ENDPOINTS.QUESTIONS}/${id}`);
  },

  associateExamHistory: async (questionId: string, examHistoryId: string) => {
    return apiClient.post(
      `${API_ENDPOINTS.QUESTIONS}/${questionId}/exam-history/${examHistoryId}`
    );
  },
};


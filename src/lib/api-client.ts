import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG } from '@/config/constants';
import { env } from '@/config/env';
import { ApiResponse, ApiError } from '@/types/api';
import CryptoJS from 'crypto-js';

function createHmacSignature(message: string, secret: string): string {
  return CryptoJS.HmacSHA256(message, secret).toString();
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}/${API_CONFIG.API_VERSION}`,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        if (this.shouldSignRequest(config.method || '')) {
          this.addRequestSignature(config);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private shouldSignRequest(method: string): boolean {
    const writeMethods = ['post', 'patch', 'put', 'delete'];
    return writeMethods.includes(method.toLowerCase()) && !!env.REQUEST_SIGNATURE_SECRET;
  }

  private addRequestSignature(config: AxiosRequestConfig) {
    if (!env.REQUEST_SIGNATURE_SECRET) return;

    const timestamp = Date.now().toString();
    const method = (config.method || '').toUpperCase();
    const path = config.url || '';
    const body = config.data || {};
    const query = config.params || {};

    const message = `${method}${path}${JSON.stringify(body)}${JSON.stringify(query)}${timestamp}`;
    const signature = createHmacSignature(message, env.REQUEST_SIGNATURE_SECRET);

    config.headers = config.headers || {};
    config.headers['X-Request-Signature'] = signature;
    config.headers['X-Request-Timestamp'] = timestamp;
  }

  private handleError(error: AxiosError<ApiError>): ApiError {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      success: false,
      statusCode: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
    };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

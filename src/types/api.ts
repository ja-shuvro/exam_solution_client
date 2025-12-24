import { BaseEntity } from './common';

export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string | string[];
    data?: T;
    meta?: PaginationMeta;
    timestamp: string;
    path?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    data: T[];
    meta: PaginationMeta;
}

export interface ApiError {
    success: false;
    statusCode: number;
    message: string | string[];
    timestamp: string;
    path?: string;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface QueryParams extends PaginationParams {
    [key: string]: string | number | boolean | undefined;
}

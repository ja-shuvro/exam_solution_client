export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    API_PREFIX: '/api',
    API_VERSION: 'v1',
    TIMEOUT: 30000,
    MAX_BODY_SIZE: 10 * 1024,
} as const;

export const API_ENDPOINTS = {
    HEALTH: '/health',
    CLASSES: '/classes',
    SUBJECTS: '/subjects',
    CHAPTERS: '/chapters',
    CLASS_SUBJECTS: '/class-subjects',
    QUESTIONS: '/questions',
    EXAM_HISTORIES: '/exam-histories',
    QUESTION_SETS: '/question-sets',
} as const;

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MIN_PAGE: 1,
    MAX_PAGE: 10000,
    MIN_LIMIT: 1,
    MAX_LIMIT: 100,
} as const;

export const QUESTION_TYPES = {
    MCQ: 'MCQ',
    SQ: 'SQ',
    CQ: 'CQ',
} as const;

export const RATE_LIMITS = {
    CREATE_CLASS: { limit: 5, window: 60000 },
    GET_CLASSES: { limit: 20, window: 60000 },
    GET_CLASS: { limit: 30, window: 60000 },
    UPDATE_CLASS: { limit: 10, window: 60000 },
    DELETE_CLASS: { limit: 5, window: 60000 },
} as const;


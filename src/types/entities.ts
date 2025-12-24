import { BaseEntity } from './common';

export interface Class extends BaseEntity {
    name: string;
    class_subjects?: ClassSubject[];
}

export interface Subject extends BaseEntity {
    name: string;
    chapters?: Chapter[];
    class_subjects?: ClassSubject[];
}

export interface Chapter extends BaseEntity {
    name: string;
    subject_id: string;
    subject?: Subject;
    classes?: Class[];
}

export interface ClassSubject extends BaseEntity {
    class_id: string;
    subject_id: string;
    class?: Class;
    subject?: Subject;
}

export type QuestionType = 'MCQ' | 'SQ' | 'CQ';

export interface MCQMeta {
    question_text: string;
    options: string[];
    correct_answer: number;
}

export interface SQMeta {
    question_text: string;
    answer: string;
}

export interface CQMeta {
    question_text: string;
    answer: string;
}

export type QuestionMeta = MCQMeta | SQMeta | CQMeta;

export interface Question extends BaseEntity {
    type: QuestionType;
    total_mark: number;
    class_subject_id: string;
    chapter_id: string;
    author_id?: string;
    status?: string;
    difficulty?: string;
    class_subject?: ClassSubject;
    chapter?: Chapter;
    mcq_meta?: MCQMeta;
    sq_meta?: SQMeta;
    cq_meta?: CQMeta;
}

export interface ExamHistory extends BaseEntity {
    type?: string;
    year?: number;
    questions?: Question[];
}

export interface QuestionSet extends BaseEntity {
    name?: string;
    questions?: Question[];
}


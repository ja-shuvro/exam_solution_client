export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface BaseEntity {
  id: string | number;
  created_at: string;
  updated_at: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
}

export interface FilterParams {
  [key: string]: string | number | boolean | null | undefined;
}


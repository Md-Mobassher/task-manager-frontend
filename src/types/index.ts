// File: src/types/index.ts
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage?: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  status?: number;
  statusCode?: number;
  data?: string;
  message?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  userId: string;
  user?: any;
  createdAt?: string;
  updatedAt?: string;
}

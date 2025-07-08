// types/mocktest.ts
export interface MockTest {
  id: string;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  description: string;
}

export interface CreateMockTestRequest {
  title: string;
  subject: string;
  duration: string;
  questions: number;
  description: string;
}

export interface UpdateMockTestRequest {
  title: string;
  subject: string;
  duration: string;
  questions: number;
  description: string;
}

export interface MockTestResponse {
  success: boolean;
  data?: MockTest | MockTest[];
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface MockTestStats {
  totalTests: number;
  totalQuestions: number;
  avgDuration: string;
  subjectsDistribution: {
    subject: string;
    count: number;
  }[];
}

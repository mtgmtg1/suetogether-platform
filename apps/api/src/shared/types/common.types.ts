// ============================================================
// Shared Common Types (LOCKED)

// 페이지네이션
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API 응답
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

// 테넌트 컨텍스트
export interface TenantContext {
  tenantId: string;
  userId: string;
  role: string;
}

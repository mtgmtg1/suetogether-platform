// ============================================================
// Shared Auth Types (LOCKED)
export interface JwtPayload {
  sub: string;        // userId
  tenantId: string;
  role: UserRole;
  email: string;
}

export type UserRole = 'ADMIN' | 'PARTNER' | 'ASSOCIATE' | 'PARALEGAL' | 'STAFF';

export interface AuthResult {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

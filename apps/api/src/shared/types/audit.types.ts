// ============================================================
// Shared Audit Types (LOCKED)
export type AuditAction =
  | 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
  | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'SIGN' | 'TRANSFER' | 'VERIFY';

export interface AuditLogInput {
  tenantId: string;
  userId?: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
}

// ============================================================
// Intake 서비스 인터페이스 (LOCKED)
// AI 챗봇 및 본인인증 인터페이스

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface IntakeSession {
  sessionId: string;
  plaintiffId?: string;
  caseId: string;
  messages: ChatMessage[];
  collectedData: Record<string, any>;
  qualificationScore?: number;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
}

export interface IdentityVerificationRequest {
  provider: 'KCB' | 'NICE' | 'PASS';
  name: string;
  phone: string;
  birthDate: string; // YYYYMMDD
}

export interface IdentityVerificationResult {
  verified: boolean;
  transactionId: string;
  provider: string;
  verifiedName?: string;
  verifiedPhone?: string;
  errorMessage?: string;
}

export interface BankAccountVerificationRequest {
  bankCode: string;
  accountNumber: string;
  holderName: string;
}

export interface BankAccountVerificationResult {
  verified: boolean;
  actualHolder?: string;
  bankName?: string;
  errorMessage?: string;
}

export interface IIntakeService {
  startSession(caseId: string): Promise<IntakeSession>;
  sendMessage(sessionId: string, message: string): Promise<IntakeSession>;
  verifyIdentity(req: IdentityVerificationRequest): Promise<IdentityVerificationResult>;
  verifyBankAccount(req: BankAccountVerificationRequest): Promise<BankAccountVerificationResult>;
  getQualificationScore(sessionId: string): Promise<number>;
}

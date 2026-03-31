import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../../core/prisma.service';
import { AuditService } from '../../core/audit/audit.service';
import { CryptoService } from '../../core/crypto/crypto.service';
import { ChatbotService } from './chatbot.service';
import { IdentityVerificationService } from './identity-verification.service';
import { BankVerificationService } from './bank-verification.service';
import { MassArbitrationService } from './mass-arbitration.service';
import { randomUUID } from 'crypto';
import type {
  IIntakeService,
  IntakeSession,
  IdentityVerificationRequest,
  IdentityVerificationResult,
  BankAccountVerificationRequest,
  BankAccountVerificationResult
} from '../../shared/interfaces/intake.interface';

@Injectable()
export class IntakeService implements IIntakeService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly crypto: CryptoService,
    private readonly chatbot: ChatbotService,
    private readonly identityVerify: IdentityVerificationService,
    private readonly bankVerify: BankVerificationService,
    private readonly massArbitration: MassArbitrationService,
  ) {}

  // In-memory store for sessions
  private sessions: Record<string, IntakeSession> = {};

  private get tenantId(): string {
    return this.request.tenantId;
  }

  private get userId(): string {
    return this.request.user?.sub;
  }

  async startSession(caseId: string): Promise<IntakeSession> {
    // [Flow: Validate Case -> Create Session -> Return Session]
    const tenantId = this.tenantId;

    const existingCase = await this.prisma.case.findUnique({
      where: { id: caseId, tenantId },
    });

    if (!existingCase) {
      throw new NotFoundException(`Case ${caseId} not found`);
    }

    const sessionId = randomUUID();
    const newSession: IntakeSession = {
      sessionId,
      caseId,
      messages: [
        {
          role: 'system',
          content: 'You are a legal intake assistant. Help the user file their claim.',
          timestamp: new Date(),
        }
      ],
      collectedData: {},
      status: 'ACTIVE',
    };

    this.sessions[sessionId] = newSession;

    await this.audit.log({
      tenantId,
      userId: this.userId,
      action: 'CREATE' as any,
      resource: 'IntakeSession',
      resourceId: sessionId,
      newValue: { caseId },
    });

    return newSession;
  }

  async getSession(sessionId: string): Promise<IntakeSession> {
    // [Flow: Look up Session -> Return]
    const session = this.sessions[sessionId];
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found`);
    }

    return session;
  }

  async sendMessage(sessionId: string, message: string): Promise<IntakeSession> {
    // [Flow: Get Session -> Append User Message -> Chatbot Generate Reply -> Append Reply -> Return Session]

    const session = await this.getSession(sessionId);

    if (session.status !== 'ACTIVE') {
      throw new Error(`Cannot send message to session in status ${session.status}`);
    }

    session.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    const reply = await this.chatbot.generateReply(session.messages);

    session.messages.push({
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    });

    // Update qualification score mockup
    if (session.messages.length > 5) {
      session.qualificationScore = 85;
      session.status = 'COMPLETED';
    }

    return session;
  }

  async verifyIdentity(req: IdentityVerificationRequest): Promise<IdentityVerificationResult> {
    // [Flow: Call Identity Service -> Encrypt PII -> Log Audit Trail -> Return Result]
    const tenantId = this.tenantId;
    const result = await this.identityVerify.verify(req);

    if (result.verified) {
      const encryptedName = await this.crypto.encrypt(req.name, tenantId);
      const encryptedPhone = await this.crypto.encrypt(req.phone, tenantId);

      // Log audit trail, carefully omitting plain text PII
      await this.audit.log({
        tenantId,
        userId: this.userId,
        action: 'VERIFY' as any,
        resource: 'Identity',
        resourceId: result.transactionId,
        newValue: { provider: req.provider, transactionId: result.transactionId, encryptedName: encryptedName.toString('base64'), encryptedPhone: encryptedPhone.toString('base64') },
      });
    }

    return result;
  }

  async verifyBankAccount(req: BankAccountVerificationRequest): Promise<BankAccountVerificationResult> {
    // [Flow: Call Bank Service -> Encrypt PII -> Log Audit Trail -> Return Result]
    const tenantId = this.tenantId;
    const result = await this.bankVerify.verifyAccount(req);

    if (result.verified) {
      const encryptedAccount = await this.crypto.encrypt(req.accountNumber, tenantId);

      await this.audit.log({
        tenantId,
        userId: this.userId,
        action: 'VERIFY' as any,
        resource: 'BankAccount',
        resourceId: result.bankName || 'bank',
        newValue: { bankCode: req.bankCode, encryptedAccount: encryptedAccount.toString('base64') },
      });
    }

    return result;
  }

  async getQualificationScore(sessionId: string): Promise<number> {
    // [Flow: Get Session -> Return Score]
    const session = await this.getSession(sessionId);

    return session.qualificationScore ?? 0;
  }
}

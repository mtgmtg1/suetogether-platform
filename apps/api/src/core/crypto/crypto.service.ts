// ============================================================
// Crypto Service: PII 암호화/복호화 (AES-256-GCM) (LOCKED)
// [Flow: 평문 입력 → 테넌트별 키 조회 → AES-256-GCM 암호화 → IV+암호문 반환]
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CryptoService {
  private readonly ALGORITHM = 'aes-256-gcm';
  private readonly IV_LENGTH = 16;
  private readonly AUTH_TAG_LENGTH = 16;

  constructor(private readonly prisma: PrismaService) {}

  async encrypt(plaintext: string, tenantId: string): Promise<Buffer> {
    const key = await this.getTenantKey(tenantId);
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    // 포맷: [IV (16)] + [AuthTag (16)] + [Encrypted Data]
    return Buffer.concat([iv, authTag, encrypted]);
  }

  async decrypt(encryptedData: Buffer, tenantId: string): Promise<string> {
    const key = await this.getTenantKey(tenantId);

    const iv = encryptedData.subarray(0, this.IV_LENGTH);
    const authTag = encryptedData.subarray(
      this.IV_LENGTH,
      this.IV_LENGTH + this.AUTH_TAG_LENGTH,
    );
    const ciphertext = encryptedData.subarray(
      this.IV_LENGTH + this.AUTH_TAG_LENGTH,
    );

    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString('utf8');
  }

  private async getTenantKey(tenantId: string): Promise<Buffer> {
    const tenant = await this.prisma.tenant.findUniqueOrThrow({
      where: { id: tenantId },
      select: { encryptionKey: true },
    });
    // 실제 환경에서는 KMS에서 키를 조회·복호화
    return Buffer.from(tenant.encryptionKey, 'hex');
  }
}

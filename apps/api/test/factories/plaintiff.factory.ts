import { Prisma, PrismaClient } from '@prisma/client';

export class PlaintiffFactory {
  static async create(
    prisma: PrismaClient,
    tenantId: string,
    caseId: string,
    overrides?: Partial<Prisma.PlaintiffUncheckedCreateInput>,
  ) {
    const defaultData: Prisma.PlaintiffUncheckedCreateInput = {
      tenantId,
      caseId,
      encryptedName: Buffer.from('John Doe'),
      encryptedPhone: Buffer.from('01012345678'),
      bankCode: '004',
      encryptedBankAccount: Buffer.from('123-456-7890'),
    };

    return prisma.plaintiff.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }

  static async createMany(
    prisma: PrismaClient,
    tenantId: string,
    caseId: string,
    count: number,
  ) {
    const plaintiffs = [];
    for (let i = 0; i < count; i++) {
      plaintiffs.push(
        await this.create(prisma, tenantId, caseId, {
          encryptedName: Buffer.from(`Plaintiff ${i + 1}`),
          encryptedPhone: Buffer.from(`0101234567${i}`),
          encryptedBankAccount: Buffer.from(`123-456-7890-${i}`),
        }),
      );
    }
    return plaintiffs;
  }
}

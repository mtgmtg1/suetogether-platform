import { Prisma, BatchTransferStatus, PrismaClient } from '@prisma/client';

export class SettlementFactory {
  static async create(
    prisma: PrismaClient,
    tenantId: string,
    caseId: string,
    overrides?: Partial<Prisma.SettlementUncheckedCreateInput>,
  ) {
    const defaultData: Prisma.SettlementUncheckedCreateInput = {
      tenantId,
      caseId,
      totalAmount: 1000000.0,
      firmFee: 100000.0,
      taxAmount: 10000.0,
      netAmount: 890000.0,
      escrowBankCode: '004',
      escrowAccount: '123-456-7890',
      batchStatus: BatchTransferStatus.PENDING,
    };

    return prisma.settlement.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }
}

export class SettlementDistributionFactory {
  static async create(
    prisma: PrismaClient,
    tenantId: string,
    settlementId: string,
    plaintiffId: string,
    overrides?: Partial<Prisma.SettlementDistributionUncheckedCreateInput>,
  ) {
    const defaultData: Prisma.SettlementDistributionUncheckedCreateInput = {
      tenantId,
      settlementId,
      plaintiffId,
      grossAmount: 500000.0,
      taxDeduction: 50000.0,
      feeDeduction: 5000.0,
      netAmount: 445000.0,
      transferStatus: 'PENDING',
    };

    return prisma.settlementDistribution.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }
}

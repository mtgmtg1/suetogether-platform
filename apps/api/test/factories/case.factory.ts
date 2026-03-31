import { PrismaClient, Case, CaseType, CaseStatus, LitigationPhase, Prisma } from '@prisma/client';

export class CaseFactory {
  static async create(prisma: PrismaClient, tenantId: string, overrides?: Partial<Prisma.CaseUncheckedCreateInput>): Promise<Case> {
    const defaultData = {
      tenantId,
      title: `Test Case ${Date.now()}`,
      description: 'Test case description',
      caseType: CaseType.CONSUMER,
      status: CaseStatus.DISCOVERY,
      currentPhase: LitigationPhase.INTAKE,
    };

    return prisma.case.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }

  static async createMany(prisma: PrismaClient, tenantId: string, count: number): Promise<Case[]> {
    const cases = [];
    for (let i = 0; i < count; i++) {
      cases.push(await this.create(prisma, tenantId));
    }
    return cases;
  }
}

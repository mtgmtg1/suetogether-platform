import { PrismaClient, Tenant, Prisma } from '@prisma/client';

export class TenantFactory {
  static async create(prisma: PrismaClient, overrides?: Partial<Prisma.TenantUncheckedCreateInput>): Promise<Tenant> {
    const defaultData = {
      name: 'Test Tenant',
      slug: `test-tenant-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      plan: 'STANDARD' as any,
      encryptionKey: 'test-encryption-key-for-tenant-must-be-long-enough',
      isActive: true,
    };

    return prisma.tenant.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }

  static async createMany(prisma: PrismaClient, count: number): Promise<Tenant[]> {
    const tenants = [];
    for (let i = 0; i < count; i++) {
      tenants.push(await this.create(prisma));
    }
    return tenants;
  }
}

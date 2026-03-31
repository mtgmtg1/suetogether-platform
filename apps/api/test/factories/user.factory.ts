import { PrismaClient, User, Prisma, UserRole } from '@prisma/client';

export class UserFactory {
  static async create(prisma: PrismaClient, tenantId: string, overrides?: Partial<Prisma.UserUncheckedCreateInput>): Promise<User> {
    const defaultData = {
      tenantId,
      email: `test-user-${Date.now()}@example.com`,
      name: 'Test Admin User',
      passwordHash: 'hashed-password-123',
      role: UserRole.ADMIN,
      isActive: true,
    };

    return prisma.user.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }
}

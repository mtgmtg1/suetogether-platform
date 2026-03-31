export const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  // Add other models as needed
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn(),
};

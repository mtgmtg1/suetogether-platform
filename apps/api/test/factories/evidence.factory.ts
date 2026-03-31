import { Prisma, FileType, VLMStatus, PrismaClient } from '@prisma/client';

export class EvidenceFactory {
  static async create(
    prisma: PrismaClient,
    tenantId: string,
    caseId: string,
    overrides?: Partial<Prisma.EvidenceUncheckedCreateInput>,
  ) {
    const defaultData: Prisma.EvidenceUncheckedCreateInput = {
      tenantId,
      caseId,
      fileName: 'test-document.pdf',
      fileType: FileType.DOCUMENT,
      filePath: '/storage/test-document.pdf',
      fileSize: 1024,
      mimeType: 'application/pdf',
      vlmStatus: VLMStatus.PENDING,
    };

    return prisma.evidence.create({
      data: {
        ...defaultData,
        ...overrides,
      },
    });
  }
}

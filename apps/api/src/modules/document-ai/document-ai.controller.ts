import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@core/auth/auth.guard';
import { TenantGuard } from '@core/tenant/tenant.guard';
import { CurrentTenant, CurrentUser } from '@core/decorators';
import { PrismaService } from '@core/prisma.service';
import { AuditService } from '@core/audit/audit.service';
import { VerifyEvidenceDto } from '@shared/dto/evidence.dto';
import { DocumentAIService } from './document-ai.service';
import { VLMResultResponseDto, CrossValidationResponseDto } from './dto/document-ai.dto';

@Controller('evidence')
@UseGuards(AuthGuard, TenantGuard)
export class DocumentAIController {
  constructor(
    private readonly docAIService: DocumentAIService,
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Post('verify')
  @UseInterceptors(FileInterceptor('file'))
  async verifyEvidence(
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
    @Body() dto: VerifyEvidenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');
    const path = `s3://mock-bucket/${tenantId}/${Date.now()}-${file.originalname}`;
    const evidence = await this.prisma.evidence.create({
      data: {
        tenantId, caseId: dto.caseId, plaintiffId: dto.plaintiffId,
        fileName: file.originalname, fileType: 'IMAGE', filePath: path,
        fileSize: file.size, mimeType: file.mimetype, vlmStatus: 'PENDING',
      },
    });
    await this.audit.log({
      tenantId, userId, action: 'CREATE', resource: 'Evidence',
      resourceId: evidence.id, newValue: { fileName: file.originalname },
    });
    await this.docAIService.enqueueDocument(tenantId, evidence.id);
    return { evidenceId: evidence.id, status: evidence.vlmStatus };
  }

  @Get(':id/vlm-result')
  async getVlmResult(@CurrentTenant() tenantId: string, @Param('id') id: string) {
    const evidence = await this.prisma.evidence.findFirst({ where: { id, tenantId } });
    if (!evidence) throw new NotFoundException('Evidence not found');

    const result = await this.docAIService.getVLMResult(id);
    if (!result) throw new NotFoundException('VLM Result not found');

    return result as VLMResultResponseDto;
  }

  @Post(':id/cross-validate')
  async triggerCrossValidation(
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ) {
    const ev = await this.prisma.evidence.findFirst({ where: { id, tenantId }, include: { plaintiff: true } });
    if (!ev) throw new NotFoundException('Evidence not found');
    if (!ev.vlmResult) throw new BadRequestException('VLM result not available');

    const result = await this.docAIService.crossValidate({
      plaintiffData: ev.plaintiff?.intakeData as Record<string, any> || null,
      vlmData: ev.vlmResult as Record<string, any>,
    });

    await this.prisma.evidence.update({ where: { id }, data: { crossValidationStatus: result.status, crossValidationResult: result.details as any } });
    await this.audit.log({ tenantId, userId, action: 'VERIFY', resource: 'Evidence', resourceId: id, newValue: { status: result.status } });

    return result as CrossValidationResponseDto;
  }

  @Get(':id/status')
  async getStatus(@CurrentTenant() tenantId: string, @Param('id') id: string) {
    const evidence = await this.prisma.evidence.findFirst({
      where: { id, tenantId },
      select: { id: true, vlmStatus: true, crossValidationStatus: true },
    });
    if (!evidence) throw new NotFoundException('Evidence not found');
    return evidence;
  }
}
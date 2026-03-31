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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@core/auth/auth.guard';
import { TenantGuard } from '@core/tenant/tenant.guard';
import { CurrentTenant, CurrentUser } from '@core/decorators';
import { PrismaService } from '@core/prisma.service';
import { AuditService } from '@core/audit/audit.service';
import { VerifyEvidenceDto } from '@shared/dto/evidence.dto';
import { DocumentAIService } from './document-ai.service';
import { VLMResultResponseDto, CrossValidationResponseDto } from './dto/document-ai.dto';

@ApiTags('증거 문서 분석 (Document-AI)')
@ApiBearerAuth()
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
  @ApiOperation({ summary: '증거 업로드 및 VLM 분석 요청', description: '이미지 기반 증거를 S3에 업로드하고 VLM(BullMQ)에 분석을 요청합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        caseId: { type: 'string' },
        plaintiffId: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '업로드 및 분석 큐 등록 성공' })
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
  @ApiOperation({ summary: 'VLM 분석 결과 조회', description: '특정 증거의 VLM 추출 결과를 조회합니다.' })
  @ApiResponse({ status: 200, type: VLMResultResponseDto })
  async getVlmResult(@CurrentTenant() tenantId: string, @Param('id') id: string) {
    const evidence = await this.prisma.evidence.findFirst({ where: { id, tenantId } });
    if (!evidence) throw new NotFoundException('Evidence not found');

    const result = await this.docAIService.getVLMResult(id);
    if (!result) throw new NotFoundException('VLM Result not found');

    return result as VLMResultResponseDto;
  }

  @Post(':id/cross-validate')
  @ApiOperation({ summary: '원고 진술 및 증거 교차 검증', description: '인테이크 데이터와 VLM 추출 데이터를 대조하여 모순을 검증합니다.' })
  @ApiResponse({ status: 201, type: CrossValidationResponseDto })
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
  @ApiOperation({ summary: '전체 분석 진행 상태 조회', description: 'VLM 및 식별 진행 상태를 조회합니다.' })
  @ApiResponse({ status: 200, description: '상태 정보 반환' })
  async getStatus(@CurrentTenant() tenantId: string, @Param('id') id: string) {
    const evidence = await this.prisma.evidence.findFirst({
      where: { id, tenantId },
      select: { id: true, vlmStatus: true, crossValidationStatus: true },
    });
    if (!evidence) throw new NotFoundException('Evidence not found');
    return evidence;
  }
}
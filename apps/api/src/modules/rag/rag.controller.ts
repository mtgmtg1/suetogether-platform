import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RAGService } from './rag.service';
import { TenantGuard } from '@core/tenant/tenant.guard';
import { CurrentTenant, CurrentUser } from '@core/decorators';
import { IndexDocumentsDto } from './dto/index-documents.dto';
import { QueryDto } from './dto/query.dto';
import { MedicalChronologyRequestDto } from './dto/medical-chronology-request.dto';
import {
  IndexResult,
  RAGQueryResult,
  MedicalChronologyResult,
} from '@shared/interfaces/rag.interface';

import { AuthGuard } from '@core/auth/auth.guard';

@Controller('rag')
@UseGuards(AuthGuard, TenantGuard)
export class RAGController {
  constructor(private readonly ragService: RAGService) {}

  @Post('index')
  async indexDocuments(
    @Body() dto: IndexDocumentsDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<IndexResult> {
    return this.ragService.indexDocuments(dto.caseId, dto.evidenceIds, tenantId, userId);
  }

  @Post('query')
  async query(
    @Body() dto: QueryDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<RAGQueryResult> {
    return this.ragService.query(dto.caseId, dto.question, tenantId, userId);
  }

  @Post('medical-chronology')
  async generateMedicalChronology(
    @Body() dto: MedicalChronologyRequestDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<MedicalChronologyResult> {
    return this.ragService.generateMedicalChronology(dto.caseId, dto.plaintiffId, tenantId, userId);
  }

  @Get('index/:caseId/status')
  async getIndexStatus(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
  ): Promise<{ status: string; progress: number }> {
    // Mocked status response
    return {
      status: 'PROCESSING',
      progress: 65.5,
    };
  }
}

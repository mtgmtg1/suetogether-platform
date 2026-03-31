import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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

@ApiTags('RAG 지식 검색 (RAG)')
@ApiBearerAuth()
@Controller('rag')
@UseGuards(AuthGuard, TenantGuard)
export class RAGController {
  constructor(private readonly ragService: RAGService) {}

  @Post('index')
  @ApiOperation({ summary: '문서 인덱싱 (벡터화)', description: '증거 문서를 청크로 나누어 벡터 DB(Pinecone)에 저장합니다.' })
  @ApiResponse({ status: 201, description: '인덱싱 진행 상태 반환' })
  async indexDocuments(
    @Body() dto: IndexDocumentsDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<IndexResult> {
    return this.ragService.indexDocuments(dto.caseId, dto.evidenceIds, tenantId, userId);
  }

  @Post('query')
  @ApiOperation({ summary: '지식 검색 (Q&A)', description: '인덱싱된 문서를 기반으로 질문에 대한 답변(환각 없는 지식)을 제공합니다.' })
  @ApiResponse({ status: 201, description: 'LLM 답변 및 출처 정보 반환' })
  async query(
    @Body() dto: QueryDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<RAGQueryResult> {
    return this.ragService.query(dto.caseId, dto.question, tenantId, userId);
  }

  @Post('medical-chronology')
  @ApiOperation({ summary: '의료 시간표 생성', description: '환자의 진료 기록을 분석하여 시간순 타임라인을 생성합니다.' })
  @ApiResponse({ status: 201, description: '의료 기록 타임라인 생성 반환' })
  async generateMedicalChronology(
    @Body() dto: MedicalChronologyRequestDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ): Promise<MedicalChronologyResult> {
    return this.ragService.generateMedicalChronology(dto.caseId, dto.plaintiffId, tenantId, userId);
  }

  @Get('index/:caseId/status')
  @ApiOperation({ summary: '인덱싱 상태 조회', description: '벡터화 진행률 및 상태를 조회합니다.' })
  @ApiResponse({ status: 200, description: '진행률 반환' })
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

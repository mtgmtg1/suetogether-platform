import { Controller, Post, Get, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AnalyticsService } from './analytics.service';
import { PredictOutcomeDto } from './dto/analytics.dto';
import { CurrentTenant, CurrentUser } from '../../core/decorators';
import { AuthGuard } from '../../core/auth/auth.guard';
import { TenantGuard } from '../../core/tenant/tenant.guard';

@ApiTags('소송 예측 및 분석 (Analytics)')
@ApiBearerAuth()
@Controller('analytics')
@UseGuards(AuthGuard, TenantGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('predict')
  @ApiOperation({ summary: '승소 가능성 예측', description: 'AI 모델을 사용하여 유사 판례 기반 승소 확률 및 적정 합의금을 예측합니다.' })
  @ApiResponse({ status: 201, description: '예측 결과 반환' })
  async predictOutcome(
    @Body() dto: PredictOutcomeDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.predictOutcome(dto, tenantId, userId);
  }

  @Get('cba/:caseId')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600000) // 1 Hour Cache
  @ApiOperation({ summary: '비용 편익 분석(CBA)', description: '소송 진행 시 예상되는 비용과 편익을 분석합니다.' })
  @ApiResponse({ status: 200, description: 'CBA 데이터 반환' })
  async calculateCBA(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.calculateCBA(caseId, tenantId, userId);
  }

  @Get('gis/:caseId')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600000) // 1 Hour Cache
  @ApiOperation({ summary: 'GIS 공간 분석 데이터 조회', description: '환경 피해 확산 범위 등의 공간 데이터를 조회합니다.' })
  @ApiResponse({ status: 200, description: 'GeoJSON 공간 데이터 반환' })
  async getGISData(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.getGISData(caseId, tenantId, userId);
  }

  @Get('gis/:caseId/hotspots')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600000) // 1 Hour Cache
  @ApiOperation({ summary: '피해 핫스팟 탐지', description: '원고 밀집 지역(핫스팟)을 분석합니다.' })
  @ApiResponse({ status: 200, description: '핫스팟 클러스터 GeoJSON 반환' })
  async detectHotspots(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.detectHotspots(caseId, tenantId, userId);
  }
}

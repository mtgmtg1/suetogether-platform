import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { PredictOutcomeDto } from './dto/analytics.dto';
import { CurrentTenant, CurrentUser } from '../../core/decorators';
// Assuming we have some auth guard in core, though not explicitly required to import here if globally applied
// import { AuthGuard } from '../../core/auth/auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('predict')
  async predictOutcome(
    @Body() dto: PredictOutcomeDto,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.predictOutcome(dto, tenantId, userId);
  }

  @Get('cba/:caseId')
  async calculateCBA(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.calculateCBA(caseId, tenantId, userId);
  }

  @Get('gis/:caseId')
  async getGISData(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.getGISData(caseId, tenantId, userId);
  }

  @Get('gis/:caseId/hotspots')
  async detectHotspots(
    @Param('caseId') caseId: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
  ) {
    return this.analyticsService.detectHotspots(caseId, tenantId, userId);
  }
}

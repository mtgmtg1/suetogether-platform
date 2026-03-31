import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PredictOutcomeDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: '사건 ID' })
  @IsString()
  caseId: string;

  @ApiProperty({ example: 'ENVIRONMENTAL_DAMAGE', description: '사건 유형' })
  @IsString()
  caseType: string;

  @ApiProperty({ example: '서울중앙지방법원', description: '관할 법원', required: false })
  @IsString()
  @IsOptional()
  courtName?: string;

  @ApiProperty({ example: '김판사', description: '담당 판사', required: false })
  @IsString()
  @IsOptional()
  judgeName?: string;

  @ApiProperty({ example: 100000000, description: '청구 금액 합계' })
  @IsNumber()
  @Min(0)
  claimAmount: number;

  @ApiProperty({ example: 50, description: '원고 수' })
  @IsNumber()
  @Min(1)
  plaintiffCount: number;
}

export class GISQueryDto {
  // If query parameters are needed later, they can be added here
}

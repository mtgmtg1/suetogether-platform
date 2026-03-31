import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class PredictOutcomeDto {
  @IsString()
  caseId: string;

  @IsString()
  caseType: string;

  @IsString()
  @IsOptional()
  courtName?: string;

  @IsString()
  @IsOptional()
  judgeName?: string;

  @IsNumber()
  @Min(0)
  claimAmount: number;

  @IsNumber()
  @Min(1)
  plaintiffCount: number;
}

export class GISQueryDto {
  // If query parameters are needed later, they can be added here
}

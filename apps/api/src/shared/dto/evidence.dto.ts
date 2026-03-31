// ============================================================
// Shared DTO: Evidence (LOCKED)
import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class VerifyEvidenceDto {
  @IsString()
  @IsNotEmpty()
  caseId!: string;

  @IsString()
  @IsOptional()
  plaintiffId?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CrossValidateDto {
  @IsString()
  @IsNotEmpty()
  evidenceId!: string;
}

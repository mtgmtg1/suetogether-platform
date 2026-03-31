import { IsString, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IndexDocumentsDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: '사건 ID' })
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @ApiProperty({ example: ['ev-001', 'ev-002'], description: '벡터화할 증거 ID 목록' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  evidenceIds: string[];
}

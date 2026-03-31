import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MedicalChronologyRequestDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: '사건 ID' })
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @ApiProperty({ example: 'plaintiff-456', description: '원고(환자) ID' })
  @IsNotEmpty()
  @IsUUID()
  plaintiffId: string;
}

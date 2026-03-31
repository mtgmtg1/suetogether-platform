import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: '사건 ID' })
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @ApiProperty({ example: '원고의 주요 피해 사실은 무엇인가요?', description: '질문 내용' })
  @IsString()
  @IsNotEmpty()
  question: string;
}

import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @IsString()
  @IsNotEmpty()
  question: string;
}

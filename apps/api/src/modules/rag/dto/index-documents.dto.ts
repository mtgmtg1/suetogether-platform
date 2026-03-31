import { IsString, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class IndexDocumentsDto {
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  evidenceIds: string[];
}

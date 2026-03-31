import { IsNotEmpty, IsUUID } from 'class-validator';

export class MedicalChronologyRequestDto {
  @IsNotEmpty()
  @IsUUID()
  caseId: string;

  @IsNotEmpty()
  @IsUUID()
  plaintiffId: string;
}

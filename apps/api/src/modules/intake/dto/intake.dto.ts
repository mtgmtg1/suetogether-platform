import { IsString, IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import type {
  IdentityVerificationRequest,
  BankAccountVerificationRequest
} from '../../../shared/interfaces/intake.interface';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  caseId: string;
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class VerifyIdentityDto implements IdentityVerificationRequest {
  @IsIn(['KCB', 'NICE', 'PASS'])
  provider: 'KCB' | 'NICE' | 'PASS';

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string; // YYYYMMDD
}

export class VerifyBankAccountDto implements BankAccountVerificationRequest {
  @IsString()
  @IsNotEmpty()
  bankCode: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  holderName: string;
}

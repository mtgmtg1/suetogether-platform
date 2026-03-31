import { IsString, IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type {
  IdentityVerificationRequest,
  BankAccountVerificationRequest
} from '../../../shared/interfaces/intake.interface';

export class CreateSessionDto {
  @ApiProperty({ example: 'case-12345', description: '참여할 소송 사건 ID' })
  @IsString()
  @IsNotEmpty()
  caseId: string;
}

export class SendMessageDto {
  @ApiProperty({ example: '네, 저는 2023년부터 해당 서비스를 이용했습니다.', description: '질문에 대한 답변 메시지' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class VerifyIdentityDto implements IdentityVerificationRequest {
  @ApiProperty({ example: 'PASS', description: '인증 제공자' })
  @IsIn(['KCB', 'NICE', 'PASS'])
  provider: 'KCB' | 'NICE' | 'PASS';

  @ApiProperty({ example: '홍길동', description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '010-1234-5678', description: '휴대폰 번호' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '19900101', description: '생년월일 (YYYYMMDD)' })
  @IsString()
  @IsNotEmpty()
  birthDate: string; // YYYYMMDD
}

export class VerifyBankAccountDto implements BankAccountVerificationRequest {
  @ApiProperty({ example: '004', description: '은행 코드 (예: 국민은행 004)' })
  @IsString()
  @IsNotEmpty()
  bankCode: string;

  @ApiProperty({ example: '111-111111-11-111', description: '계좌번호' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: '홍길동', description: '예금주 성명' })
  @IsString()
  @IsNotEmpty()
  holderName: string;
}

import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettlementDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: '사건 ID' })
  @IsString()
  caseId: string;

  @ApiProperty({ example: 5000000000, description: '총 합의금액' })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty({ example: '004', description: '에스크로(펌뱅킹) 은행 코드' })
  @IsString()
  escrowBankCode: string;

  @ApiProperty({ example: '111-111111-11-111', description: '에스크로 가상/실명 계좌' })
  @IsString()
  escrowAccount: string;
}

export class CalculateDistributionDto {
  @ApiProperty({ example: 10.5, description: '착수금 및 성공 보수 수수료율(%)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  feePercentage?: number;
}

export class SignDistributionDto {
  @ApiProperty({ example: 'sha256-hash-signature', description: '전자서명 해시값' })
  @IsString()
  signatureHash: string;
}

export class PaymentRequestDto {
  @ApiProperty({ example: 'order_12345', description: '주문 고유 ID' })
  @IsString()
  orderId: string;

  @ApiProperty({ example: 55000, description: '결제 금액 (VAT 포함)' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: '수임료 착수금 결제', description: '주문명' })
  @IsString()
  orderName: string;

  @ApiProperty({ example: 'user@suetogether.com', description: '고객 이메일' })
  @IsString()
  customerEmail: string;

  @ApiProperty({ example: '홍길동', description: '고객 이름' })
  @IsString()
  customerName: string;

  @ApiProperty({ example: 'CARD', enum: ['CARD', 'VIRTUAL_ACCOUNT', 'TRANSFER'], description: '결제 수단' })
  @IsEnum(['CARD', 'VIRTUAL_ACCOUNT', 'TRANSFER'])
  method: 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER';
}

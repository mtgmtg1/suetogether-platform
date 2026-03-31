import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

export class CreateSettlementDto {
  @IsString()
  caseId: string;

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsString()
  escrowBankCode: string;

  @IsString()
  escrowAccount: string;
}

export class CalculateDistributionDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  feePercentage?: number;
}

export class SignDistributionDto {
  @IsString()
  signatureHash: string;
}

export class PaymentRequestDto {
  @IsString()
  orderId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  orderName: string;

  @IsString()
  customerEmail: string;

  @IsString()
  customerName: string;

  @IsEnum(['CARD', 'VIRTUAL_ACCOUNT', 'TRANSFER'])
  method: 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER';
}

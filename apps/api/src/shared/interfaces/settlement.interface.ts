// ============================================================
// Settlement 서비스 인터페이스 (LOCKED)
// 합의금 분배 및 펌뱅킹 대량이체 인터페이스

export interface DistributionCalculation {
  plaintiffId: string;
  grossAmount: number;
  taxDeduction: number;
  feeDeduction: number;
  netAmount: number;
}

export interface DistributionResult {
  settlementId: string;
  distributions: DistributionCalculation[];
  totalGross: number;
  totalTax: number;
  totalFee: number;
  totalNet: number;
}

export interface BatchTransferRequest {
  batchId: string;
  escrowAccount: string;
  escrowBankCode: string;
  transfers: TransferItem[];
}

export interface TransferItem {
  recipientName: string;
  bankCode: string;
  accountNumber: string;
  amount: number;
  memo: string;
  referenceId: string;
}

export interface BatchTransferResult {
  batchId: string;
  totalRequested: number;
  totalSuccessful: number;
  totalFailed: number;
  results: TransferItemResult[];
}

export interface TransferItemResult {
  referenceId: string;
  success: boolean;
  bankRef?: string;
  errorMessage?: string;
  errorCode?: string;
}

export interface TransferStatusResult {
  distributionId: string;
  status: 'PENDING' | 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRY';
  transferRef?: string;
  transferredAt?: Date;
  errorMessage?: string;
}

export interface ISettlementService {
  calculateDistribution(settlementId: string): Promise<DistributionResult>;
  executeBatchTransfer(settlementId: string): Promise<BatchTransferResult>;
  getTransferStatus(distributionId: string): Promise<TransferStatusResult>;
}

// PG사 결제 인터페이스
export interface PaymentRequest {
  orderId: string;
  amount: number;
  orderName: string;
  customerEmail: string;
  customerName: string;
  method: 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER';
}

export interface PaymentResult {
  paymentKey: string;
  orderId: string;
  status: 'DONE' | 'CANCELED' | 'FAILED';
  totalAmount: number;
  method: string;
  approvedAt?: Date;
}

export interface IPaymentGateway {
  requestPayment(input: PaymentRequest): Promise<PaymentResult>;
  confirmPayment(paymentKey: string, orderId: string, amount: number): Promise<PaymentResult>;
  cancelPayment(paymentKey: string, reason: string): Promise<void>;
}

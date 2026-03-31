import { Injectable, Logger } from '@nestjs/common';
import { IPaymentGateway, PaymentRequest, PaymentResult } from '../../shared/interfaces/settlement.interface';

@Injectable()
export class PaymentGatewayService implements IPaymentGateway {
  private readonly logger = new Logger(PaymentGatewayService.name);

  /**
   * Mock request payment to TossPayments
   */
  async requestPayment(input: PaymentRequest): Promise<PaymentResult> {
    this.logger.log(`Requesting payment for order: ${input.orderId}`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      paymentKey: `pk_${Math.random().toString(36).substring(2, 15)}`,
      orderId: input.orderId,
      status: 'DONE', // In reality this would likely be pending until confirmed
      totalAmount: input.amount,
      method: input.method,
      approvedAt: new Date(),
    };
  }

  /**
   * Mock confirm payment to TossPayments
   */
  async confirmPayment(paymentKey: string, orderId: string, amount: number): Promise<PaymentResult> {
    this.logger.log(`Confirming payment: ${paymentKey} for order: ${orderId}`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      paymentKey,
      orderId,
      status: 'DONE',
      totalAmount: amount,
      method: 'CARD', // Mocked method
      approvedAt: new Date(),
    };
  }

  /**
   * Mock cancel payment to TossPayments
   */
  async cancelPayment(paymentKey: string, reason: string): Promise<void> {
    this.logger.log(`Canceling payment: ${paymentKey}. Reason: ${reason}`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

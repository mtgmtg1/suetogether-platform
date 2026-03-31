import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TaxCalculatorService {
  private readonly WITHHOLDING_TAX_RATE = new Decimal('0.033'); // 3.3%

  /**
   * Calculates the withholding tax for an individual based on the gross amount.
   * Uses Decimal for high precision financial calculations.
   */
  calculateTax(grossAmount: Decimal | number | string): Decimal {
    const amount = new Decimal(grossAmount);
    return amount.mul(this.WITHHOLDING_TAX_RATE).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  }

  /**
   * Calculates the fee based on a percentage.
   */
  calculateFee(grossAmount: Decimal | number | string, feePercentage: number): Decimal {
    const amount = new Decimal(grossAmount);
    const feeRate = new Decimal(feePercentage).div(100);
    return amount.mul(feeRate).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  }

  /**
   * Calculates the net amount after deducting tax and fee from gross amount.
   */
  calculateNetAmount(
    grossAmount: Decimal | number | string,
    taxAmount: Decimal | number | string,
    feeAmount: Decimal | number | string
  ): Decimal {
    const gross = new Decimal(grossAmount);
    const tax = new Decimal(taxAmount);
    const fee = new Decimal(feeAmount);
    return gross.sub(tax).sub(fee).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  }
}

// DTOs para el sistema de devoluciones

export interface ReturnProductRequest {
  productId: number;
  requestedQuantity: number;
}

export interface CustomerReceiver {
  customerId: number;
}

export interface PaymentInfo {
  cardType: string;
  maskedCardNumber: string;
  cardHolder: string;
}

export interface CreateReturnBillDTO {
  paymentCondition: string; // "TARJETA", "EFECTIVO", etc.
  receiver: CustomerReceiver;
  products: ReturnProductRequest[];
  withheldIva: number;
  payment?: PaymentInfo;
}

// DTO para mostrar información de devolución
export interface ReturnBillInfo {
  canBeReturned: boolean;
  isReversed: boolean;
  isReturnBill: boolean;
  returnBillCode?: string;
  originBillCode?: string;
  availableProducts: ReturnAvailableProduct[];
}

export interface ReturnAvailableProduct {
  productId: number;
  productName: string;
  originalQuantity: number;
  availableForReturn: number;
  unitPrice: number;
}

// Response DTO para factura de devolución creada
export interface ReturnBillResponseDTO {
  id: number;
  generationCode: string;
  controlNumber: string;
  totalWithIva: number;
  status: string;
  createdAt: string;
}
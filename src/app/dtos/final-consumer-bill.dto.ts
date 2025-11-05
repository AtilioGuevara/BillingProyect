// Interface para ENVIAR productos al backend (nueva estructura)
export interface ProductBillCreate {
  productId: number;
  requestedQuantity: number;
}

// Interface para MOSTRAR productos completos (para búsquedas y listas)
export interface ProductBill {
  id?: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CreateFinalConsumerBillDTO {
  paymentCondition: string;
  receiver: {
    customerName: string;
    customerLastname: string;
    customerDocument: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
  };
  products: ProductBillCreate[];
  withheldIva: number;
  payment?: {
    paymentType: string;
    cardType: string;
    maskedCardNumber: string;
    cardHolder: string;
    authorizationCode: string;
  };
}

// DTO para crear devoluciones (diferente estructura según API)
export interface CreateReturnBillDTO {
  paymentCondition: string;
  receiver: {
    customerId: number;
  };
  products: ProductBillCreate[];
  withheldIva: number;
  payment?: {
    cardType: string;
    maskedCardNumber: string;
    cardHolder: string;
  };
}

// DTO para la respuesta completa (ShowBillDto del backend)
// Usado cuando se obtiene UNA factura específica
export interface FinalConsumerBillDetailDTO {
  generationCode: string;
  controlNumber: string;
  billGenerationDate: string;
  account: string;
  paymentCondition: string;
  
  transmitter: {
    companyName: string;
    companyDocument: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
  };
  
  receiver: {
    customerId?: number;      // ID del cliente (para devoluciones)
    customerName: string;
    customerLastname: string;
    customerDocument: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
  };
  
  products: Array<{
    id: number;
    productId: number;
    name: string;
    requestedQuantity: number;
    price: number;
    subTotal: number;
  }>;
  
  nonTaxedSales: number;
  exemptSales: number;
  taxedSales: number;
  iva: number;
  perceivedIva: number;
  withheldIva: number;
  totalWithIva: number;

  // Promoción
  promotionApplied?: boolean;
  promotionCode?: string;
  promotionName?: string;
  promotionDiscount?: number;
  productsWithPromotion?: number[];

  // Campos para devoluciones (detalle)
  isReversed?: boolean;     // true si ya fue devuelta
  returnBillCode?: string;  // código de la factura de devolución generada
  originBillCode?: string;  // código de la factura original (si esta ES una devolución)
}

// DTO simplificado para la lista (getAll)
// Solo los datos esenciales para mostrar en tabla
export interface FinalConsumerBillListDTO {
  generationCode: string;
  controlNumber: string;
  billGenerationDate: string;
  customerName?: string;
  totalWithIva: number;
  account: string;
  paymentCondition: string;
  // Campos adicionales útiles para la lista
  createdAt?: string;
  status?: string; // Si el backend lo maneja
  // Campos para devoluciones
  isReversed?: boolean;     // true si ya fue devuelta
  returnBillCode?: string;  // código de la factura de devolución generada
  originBillCode?: string;  // código de la factura original (si esta ES una devolución)
}

// DTO para respuesta de devolución creada
export interface ReturnBillResponseDTO {
  id: number;
  generationCode: string;
  controlNumber: string;
  totalWithIva: number;
  status: string;
  createdAt: string;
}

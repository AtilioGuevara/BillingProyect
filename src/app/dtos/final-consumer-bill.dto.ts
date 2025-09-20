export interface ProductBill {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CreateFinalConsumerBillDTO {
  generationCode: string;
  controlNumber: string;
  billGenerationDate: string; // ISO string para LocalDateTime
  account: string;
  paymentCondition: string;

  // transmitter
  companyName: string;
  companyDocument: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;

  // receiver
  customerName?: string;
  customerDocument?: string;
  customerAddress?: string;
  customerEmail?: string;
  customerPhone?: string;

  // products
  products: ProductBill[];

  // totals
  nonTaxedSales: number;
  exemptSales: number;
  taxedSales: number;
  iva: number;
  perceivedIva: number;
  withheldIva: number;
  totalWithIva: number;
}

// DTO específico para la respuesta del getAll
export interface FinalConsumerBillListDTO {
  id: number; // Solo para la base de datos
  generationCode: string; // Se muestra en la vista
  controlNumber: string; // Se muestra en la vista
}

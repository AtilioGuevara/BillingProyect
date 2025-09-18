export interface ProductBillDto {
  id?: number;
  // Agrega aquí los campos de ProductBill según tu modelo
}

export interface FinalConsumerBillDto {
  id?: number;
  generationCode: string;
  controlNumber: string;
  billGenerationDate: string; // ISO string
  account: string;
  paymentCondition: string;

  // Transmitter
  companyName: string;
  companyDocument: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;

  // Receiver
  customerName: string;
  customerDocument: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;

  // Products
  products: ProductBillDto[];

  // Totals
  nonTaxedSales: number;
  exemptSales: number;
  taxedSales: number;
  iva: number;
  perceivedIva: number;
  withheldIva: number;
  totalWithIva: number;
}

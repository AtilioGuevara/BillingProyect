export interface ProductBill {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateFinalConsumerBillDTO {
  generationCode: string;
  controlNumber: string;
  products: ProductBill[];
  nonTaxedSales: number;
  exemptSales: number;
  taxedSales: number;
  iva: number;
  perceivedIva: number;
  withheldIva: number;
  totalWithIva: number;
}

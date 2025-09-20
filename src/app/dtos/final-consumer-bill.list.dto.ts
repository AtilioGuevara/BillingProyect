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

// DTO específico para la respuesta del getAll
export interface FinalConsumerBillListDTO {
  id: number;
  generationCode: string;
  controlNumber: string;
  totalWithIva: number;
  status: string; // DRAFT, SENT, APPROVED, etc.
  createdAt: string; // Fecha de creación
  updatedAt: string; // Última actualización
}

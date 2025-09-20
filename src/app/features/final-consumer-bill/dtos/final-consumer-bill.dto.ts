export interface ProductBill {
  // Estructura según tu modelo del backend
  id?: number; // Opcional para productos nuevos
  name: string;
  quantity: number;
  price: number;
}

export interface CreateFinalConsumerBillDTO {
  // Campos que el backend genera automáticamente si vienen vacíos
  generationCode: string; // 36 caracteres - backend lo genera si está vacío
  controlNumber: string;  // DTE-03-xxxxxxxx-xxxxxxxxxxxxxxx - backend lo genera si está vacío
  
  // Campos obligatorios del formulario
  billGenerationDate: string; // ISO string para LocalDateTime
  account: string;           // @NotBlank
  paymentCondition: string;  // @NotBlank

  // transmitter (emisor) - SE MANEJA EN EL BACKEND AUTOMÁTICAMENTE
  // El backend obtendrá esta información de la configuración de la empresa
  // companyName, companyDocument, companyAddress, companyEmail, companyPhone

  // receiver (receptor) - todos opcionales
  customerName?: string;
  customerDocument?: string; // NIT or DUI
  customerAddress?: string;
  customerEmail?: string;
  customerPhone?: string;

  // products - @NotEmpty (el frontend solo envía productos, el backend calcula totales)
  products: ProductBill[];
  
  // observaciones adicionales - opcional
  observations?: string;
  
  // NOTA: Los totales (nonTaxedSales, exemptSales, taxedSales, iva, etc.) 
  // se calculan automáticamente en el backend basándose en los productos
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

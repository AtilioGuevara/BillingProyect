// Interface para ENVIAR productos al backend (solo ID)
export interface ProductBillCreate {
  id: number; // Solo ID del producto para crear factura
}

// Interface para MOSTRAR productos completos (para búsquedas y listas)
export interface ProductBill {
  id?: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CreateFinalConsumerBillDTO {
  // Campos principales del formulario
  account: string;               
  paymentCondition: string;      

  // Datos de la empresa (valores fijos)
  companyName: string;           
  companyDocument: string;       
  companyAddress: string;        
  companyEmail: string;          
  companyPhone: string;          

  // Datos del cliente
  customerName: string;          
  customerDocument: string;      
  customerAddress: string;       
  customerEmail: string;         
  customerPhone: string;         

  // Productos - array de IDs para crear
  products: ProductBillCreate[];       
  
  // Totales
  nonTaxedSales: number;         
  exemptSales: number;           
  taxedSales: number;            
  iva: string;                   
  perceivedIva: number;          
  withheldIva: number;           
  totalWithIva: number;          
}

// DTO para la respuesta completa (ShowBillDto del backend)
// Usado cuando se obtiene UNA factura específica
export interface FinalConsumerBillDetailDTO {
  generationCode: string;
  controlNumber: string;
  billGenerationDate: string;
  account: string;
  paymentCondition: string;
  
  // Información de la empresa (viene del backend)
  companyName: string;
  companyDocument: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  
  // Información del cliente
  customerName?: string;
  customerDocument?: string;
  customerAddress?: string;
  customerEmail?: string;
  customerPhone?: string;
  
  // Productos completos
  products: ProductBill[];
  
  // Totales calculados por el backend
  nonTaxedSales: number;
  exemptSales: number;
  taxedSales: number;
  iva: number;
  perceivedIva: number;
  withheldIva: number;
  totalWithIva: number;
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
}

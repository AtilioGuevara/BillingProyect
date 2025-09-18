// src/app/Data/models.ts
export interface Product {
  productName: string;
  salesUnit: number;
  price: string;
  stock: number;
  revenue: string;
  rating: number;
  image: string;
}


export interface Invoice {
  invoiceID: string;
  client: string;
  dateDue: string;
  totalAmount: string;
  status: string;
}

export interface ProductStock {
  productsID: string;
  productName: string;
  stock: number;
  price: string;
  status: string;
}

export interface Campaign {
  campaignTitle: string;
  clickRate: string;
  deliveredRate: string;
  impressions: string;
  cpc: string;
  cr: string;
  revenue: string;
}
export interface Email {
  [key: string]: string;
  emailName: string;
  publishDate: string;
  sent: string;
  clickRate: string;
  deliveredRate: string;
  spamReport: string;
}

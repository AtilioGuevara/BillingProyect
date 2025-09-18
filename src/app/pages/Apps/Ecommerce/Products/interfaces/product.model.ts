export interface Products {
  productID: string;
  productName: string;
  category: string;
  price: number;
  revenue: string;
  qty: number;
  image: string;
  status: boolean;
  brand: string;
  description: string;
  gender: string;
  size: string[];
  colores: string[];
  cashOnDelivery: boolean;
  visaAndMaster: boolean;
  bankTransfer: boolean;
  stock: number;
  discount: number;
  sellingPrice: number;
  image1: string;
  image2: string;
  checked: boolean;
  count?: number;
  selectedSize?: string;
  selectedColor?: string;
  displayedPrice?: string;
}

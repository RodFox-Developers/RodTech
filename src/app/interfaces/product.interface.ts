export interface Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  mainDescription: string;
  description: string;
  $key?: string;
  quantity?: number;
}

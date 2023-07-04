/* eslint-disable prettier/prettier */
export interface Item {
  productId: string;
  name: string;
  basePrice: number;
  thumbnail: string;
}

export interface DataSection {
  title: string;
  products: Item[];
}

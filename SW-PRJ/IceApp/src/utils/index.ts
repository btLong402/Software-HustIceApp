/* eslint-disable prettier/prettier */

import {Category} from '../redux/category/categorySlice';
import {Product} from '../redux/product/productSlice';

export const getData = (productList: Product[], category: Category[]) => {
  const Data: Array<{
    title: string;
    products: Array<{
      productId: string;
      name: string;
      basePrice: number;
      thumbnail: string;
    }>;
  }> = [];

  category.forEach((c: Category) => {
    const products: Product[] = [];
    productList.forEach((p: Product) => {
      p.category.forEach((ca: any) => {
        if (ca.title === c.title) {
          products.push(p);
        }
      });
    });
    Data.push({
      title: c.title,
      products: products.map(p => ({
        productId: p.productId,
        name: p.name,
        basePrice: p.basePrice,
        thumbnail: p.image,
      })),
    });
  });

  return Data;
};

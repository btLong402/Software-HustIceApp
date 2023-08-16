import {Category} from '../redux/category/categorySlice';
import {Product} from '../redux/product/productSlice';
import {Size} from '../redux/size/sizeSlice';
import {Topping} from '../redux/topping/toppingSlice';
import {Choose} from '../redux/order/orderSupportSlice';

export const getData = (
  productList: Product[],
  categoryList: Category[],
  sizeList: Size[],
  toppingList: Topping[],
) => {
  return categoryList.map((category: Category) => {
    const products: Choose[] = productList
      .filter((product: Product) =>
        product.category.some(cat => cat.title === category.title),
      )
      .map((product: Product) => {
        const productSizes = sizeList.filter(size =>
          product.sizeList.some(ps => 
            ps.sizeId === size.sizeId
          ),
        );
        const productToppings = toppingList.filter(topping =>
          product.toppingList.some(pt => pt.toppingId === topping.toppingId),
        );
        return {
          productId: product.productId,
          basePrice: product.basePrice,
          thumbnail: product.image,
          name: product.name,
          size: productSizes,
          toppingList: productToppings,
        };
      });
    return {
      title: category.title,
      products: products,
    };
  });
};

import {Category} from '../redux/category/categorySlice';
import {Product} from '../redux/product/productSlice';
import {Size} from '../redux/size/sizeSlice';
import {Topping} from '../redux/topping/toppingSlice';
import {Choose} from '../redux/order/orderSupportSlice';
import {useAppSelector} from '../redux/hook';

export const getData = (
  productList: Product[],
  categoryList: Category[],
  sizeList: Size[],
  toppingList: Topping[],
) => {
  return categoryList.map((category: Category) => {
    const products: Choose[] = productList
      .filter((product: Product) =>
        product.category.some(cat => {
          let t = cat.title === category.title;
          return t;
        }),
      )
      .map((product: Product) => {
        const productSizes = sizeList.filter(size =>
          product.sizeList.some(ps => ps.sizeId === size.sizeId),
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

export const getSizePrice = (sizeId: string) => {
  const {sizeList} = useAppSelector(state => state.sizeList);
  let price: number = 0;
  for (let size of sizeList) {
    if (size.sizeId === sizeId) price = size.price;
  }
  return price;
};

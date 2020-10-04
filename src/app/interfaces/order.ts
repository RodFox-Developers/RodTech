import { Product } from 'src/app/interfaces/product.interface';
import { AppUser } from 'src/app/interfaces/app-user';
export class Order {

  createdDate;
  items: any[];
  $key?;

  constructor(public user: AppUser, public shippingAddress: any, cartItems: Product[]) {
    this.createdDate = new Date().getTime();

    this.items = cartItems.map(i => {
      return {
        product: {
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl
        },
        totalPrice: i.quantity * i.price
      };
    });
  }



}

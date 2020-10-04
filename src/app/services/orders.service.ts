import { async } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFireDatabase, private shopCartService: ShoppingCartService) { }

  async setOrder(order) {
    const storeOrder = await this.db.list('/orders/').push(order);
    this.shopCartService.deleteAllProductsCart();
    return storeOrder;
  }

  async getOrders(): Promise<Observable<Order[]>> {
    return this.db.list<Order>('/orders/').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const order = action.payload.val();
            order['$key'] = action.key;
            return order;
          });
        })
      );
  }
}

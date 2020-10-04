import { async } from '@angular/core/testing';
import { ShoppingCart } from './../interfaces/shopping-cart';
import { AngularFireDatabase, AngularFireObject, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getProductsCart(): Promise<Observable<Product[]>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.list<Product>('/shopping-carts/' + cartId + '/items/').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const p = action.payload.val();
            p['$key'] = action.key;
            return p;
          });
        })
      );
  }

  async deleteProductCart(product) {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<Product>('/shopping-carts/' + cartId + '/items/' + product.$key).remove();
  }

  async deleteAllProductsCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.list<Product>('/shopping-carts/' + cartId + '/items/').remove();
  }

  async addProductToCart(product) {
    this.updateCartProducts(product, 1);
  }

  async removeProductFromCart(product) {
    this.updateCartProducts(product, -1);
  }

  async getCartId(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async getTotalItemPrice(): Promise<Observable<number[]>> {
    return (await this.getProductsCart()).pipe(
      map(items => {
        return items.map(item => {
          return item.price * item.quantity;
        });
      })
    );
  }

  async getTotalItemsPrice(): Promise<Observable<number>> {
    const totalItemPrice = await this.getTotalItemPrice();
    return totalItemPrice.pipe(
      map(itemsPrice => {
        return itemsPrice.reduce((a, c) => {
          return a + c;
        }, 0);
      })
    );
  }

  async getTotalItemsQuantity() {
    const cartId$ = await this.getCartId();
    return cartId$.snapshotChanges().pipe(
      map(cart => {
        let totalItemsQuantity = 0;
        for (const productId in cart.payload.val().items) {
          totalItemsQuantity += cart.payload.val().items[productId].quantity;
        }
        return totalItemsQuantity;
      })
    );
  }

  private addDateToCart() {
    return this.db.list('/shopping-carts').push({
      dateCreation: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.addDateToCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateCartProducts(product: Product, change) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    itemRef.snapshotChanges().pipe(take(1)).subscribe(p => {
      const quantity = (p.payload.hasChild('quantity')) ? (p.payload.val()['quantity'] || 0) + change : 1;
      if (quantity === 0) {
        itemRef.remove();
      } else {
        itemRef.update({
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      }
    });
  }
}

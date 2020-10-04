import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }

  addProduct(product) {
    return this.db.list('/products').push(product);
  }

  getProducts() {
    return this.db.list<Product>('/products').snapshotChanges()
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

  getProduct(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).set(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}

import { async } from '@angular/core/testing';
import { Product } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartItems: Product[];
  totalItemsQuantity: number = 0;
  totalItemPrice: number[] = [];
  totalItemsPrice: number = 0;
  subscription: Subscription;
  shoppingCart;

  constructor(private shopCartService: ShoppingCartService) { }

  async ngOnInit() {
    const cartId$ = await this.shopCartService.getCartId();
    this.subscription = cartId$.snapshotChanges().subscribe(cart => {
      this.shoppingCart = cart;
    });
    const getTotalItemsQuantity = await this.shopCartService.getTotalItemsQuantity();
    getTotalItemsQuantity.subscribe(total => {
      this.totalItemsQuantity = total;
    });
    const getProductsCart = await this.shopCartService.getProductsCart();
    getProductsCart.subscribe(items => {
      this.cartItems = items;
    });

    const getTotalItemPrice = await this.shopCartService.getTotalItemPrice();
    getTotalItemPrice.subscribe(price => {
      this.totalItemPrice = price;
    });
    const getTotalItemsPrice = await this.shopCartService.getTotalItemsPrice();
    getTotalItemsPrice.subscribe(price => {
      this.totalItemsPrice = price;
    });
  }

  onDeleteProduct(item) {
      this.shopCartService.deleteProductCart(item);
  }

  onDeleteAllItems() {
    this.shopCartService.deleteAllProductsCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from 'src/app/interfaces/product.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() showAddBtn: boolean = false;
  @Input() shoppingCart;

  constructor(private shopCartService: ShoppingCartService) { }

  getQuantity() {
    if (this.shoppingCart.items) {
      const item = this.shoppingCart.items[this.product.$key];
      return item ? item.quantity : 0;
    } else {
      return 0;
    }
  }

  onAddProduct() {
    this.shopCartService.addProductToCart(this.product);
  }
}

import { Product } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input() item: Product;
  @Input() product: Product;
  @Input() shoppingCart;

  constructor(private shopCartService: ShoppingCartService) {}

  showQuantity() {
    if (this.item) {
      return this.item.quantity;
    } else {
      if (!this.shoppingCart) { return 0; }
      const item = this.shoppingCart.items[this.product.$key];
      return item ? item.quantity : 0;
    }
  }

  onAddProduct() {
    if (this.product) {
      this.shopCartService.addProductToCart(this.product);
    }
    if (this.item) {
      this.shopCartService.addProductToCart(this.item);
    }
  }

  onRemoveProduct() {
    if (this.product) {
      this.shopCartService.removeProductFromCart(this.product);
    }
    if (this.item) {
      this.shopCartService.removeProductFromCart(this.item);
    }
  }

  onDeleteProduct(product) {
    this.shopCartService.deleteProductCart(product);
  }
}

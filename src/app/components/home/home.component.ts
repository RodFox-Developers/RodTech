import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  shoppingCart;
  categories;
  subscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private shopCartService: ShoppingCartService,
    private categoryService: CategoryService) { }

   async ngOnInit() {
    this.productsService.getProducts()
      .subscribe(p => {
        this.products = p;
      });

    const cartId = await this.shopCartService.getCartId();
    this.subscription = cartId.valueChanges().subscribe(data => {
      this.shoppingCart = data;
    });

    this.categories = this.categoryService.getCategories().valueChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

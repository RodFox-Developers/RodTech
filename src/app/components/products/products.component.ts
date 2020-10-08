import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart;
  subscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private shopCartService: ShoppingCartService) {

    this.productsService.getProducts()
      .pipe(
        take(1),
        switchMap(p => {
        this.products = p;
        return this.route.queryParamMap;
        })
      )
      .subscribe(params => {

        this.category = params.get('category');

        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) :
        this.products;
      });
  }

  async ngOnInit() {
    const cartId = await this.shopCartService.getCartId();
    this.subscription = cartId.valueChanges().subscribe(data => {
      this.shoppingCart = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

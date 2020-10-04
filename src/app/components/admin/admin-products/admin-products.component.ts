import { ProductsService } from './../../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  page = 1;
  pageSize = 5;

  constructor(
    private productsService: ProductsService
  ) {
    this.subscription = this.productsService.getProducts()
      .subscribe(p => {
        this.filteredProducts = this.products = p.reverse();
      });
  }

  ngOnInit(): void {
  }

  productFilter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

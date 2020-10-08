import { Product } from './../../../interfaces/product.interface';
import { ProductsService } from './../../../services/products.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  public product: Product = {
    title: null,
    price: null,
    category: null,
    imageUrl: null,
    mainDescription: null,
    description: null
  };
  id;

  constructor(
    categoryService: CategoryService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().valueChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productsService.getProduct(this.id).pipe(take(1))
      .subscribe(p => {
        this.product = p;
      });
    }
  }

  ngOnInit(): void {
  }

  createProduct(product) {
    if (this.id) {
      this.productsService.updateProduct(this.id, product.value);
    } else {
      this.productsService.addProduct(product.value);
    }
    this.router.navigate(['/admin/products']);
  }

  onDeleteProduct() {
    if (!confirm('Are you sure you wanna delete the product?')) { return; }

    this.productsService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

}

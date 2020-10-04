import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { async } from '@angular/core/testing';
import { Product } from 'src/app/interfaces/product.interface';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  @Input() cartItems: Product[];
  totalItemsPrice: number = 0;
  totalItemsQuantity: number = 0;
  subscription: Subscription;

  constructor(private shopCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = await (await this.shopCartService.getTotalItemsPrice()).subscribe(price => {
      this.totalItemsPrice = price;
    });
    await (await this.shopCartService.getTotalItemsQuantity()).pipe(take(1)).subscribe(total => {
      this.totalItemsQuantity = total;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

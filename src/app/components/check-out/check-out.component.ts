import { Router } from '@angular/router';
import { Order } from './../../interfaces/order';
import { AppUser } from 'src/app/interfaces/app-user';
import { OrdersService } from './../../services/orders.service';
import { AuthService } from './../../services/auth.service';
import { Product } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cartItems: Product[];
  cartSubscription: Subscription;
  userSubscription: Subscription;
  user: AppUser;
  userId: string;

  constructor(
    private shopCartService: ShoppingCartService,
    private router: Router,
    private auth: AuthService,
    private ordersService: OrdersService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.shopCartService.getProductsCart()).subscribe(items => {
      this.cartItems = items;
    });
    this.auth.user$.pipe(take(1)).subscribe(user => this.userId = user.uid);
    this.userSubscription = this.auth.appUser$.subscribe(user => {
      this.user = {
        name: user.name,
        email: user.email,
        uid: this.userId
      };
    });

  }

  async onPlacePrder(shippingAddress) {
    const order = new Order(this.user, shippingAddress.value, this.cartItems);
    const orderResult = await this.ordersService.setOrder(order);
    this.router.navigate(['/order-success/', orderResult.key]);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}

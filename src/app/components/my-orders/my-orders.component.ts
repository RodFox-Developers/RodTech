import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/interfaces/app-user';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[] = [];
  user: AppUser = null;
  showUserTable: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private auth: AuthService) {

    }

  async ngOnInit() {
    this.auth.appUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    const getOrders = await this.ordersService.getOrders();
    getOrders.pipe(take(1)).subscribe(orders => {
      if (this.user) {
        this.orders = orders.reverse().filter(filteredUser => {
          return this.user.$key === filteredUser.user.uid;
        });
      }
    });
  }
}

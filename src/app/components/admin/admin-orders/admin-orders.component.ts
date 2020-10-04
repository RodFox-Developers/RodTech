import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/interfaces/app-user';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  adminOrders: Order[] = [];
  adminUser: AppUser = null;

  constructor(
    private ordersService: OrdersService,
    private auth: AuthService) {
    }

  async ngOnInit() {
    this.auth.appUser$.pipe(take(1)).subscribe(user => {
      this.adminUser = user;
    });
    const getOrders = await this.ordersService.getOrders();
    getOrders.pipe(take(1)).subscribe(orders => {
      if (this.adminUser) {
        if (this.adminUser.userRole === 'admin') {
          this.adminOrders = orders.reverse();
        }
      }
    });
  }

}

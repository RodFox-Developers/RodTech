import { AppUser } from 'src/app/interfaces/app-user';
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {

  @Input() orders: Order[] = [];
  @Input() adminOrders: Order[];


  getOrders() {
    if (this.adminOrders) {
      return this.adminOrders;
    } else {
      return this.orders;
    }
  }
}

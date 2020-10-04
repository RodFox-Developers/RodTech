import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/interfaces/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  totalItemsQuantity: number = 0;

  constructor(private auth: AuthService, private shopCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    const getTotalItemsQuantity = await this.shopCartService.getTotalItemsQuantity();
    getTotalItemsQuantity.subscribe(total => {
      this.totalItemsQuantity = total;
    });
  }

  onLogout() {
    this.auth.logout();
  }

}

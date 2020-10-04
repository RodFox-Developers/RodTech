import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
    ) {
    this.auth.user$.subscribe(user => {
      if (!user) {return;} else {
        this.userService.saveUser(user);

        const localReturnUrl = localStorage.getItem('returnUrl');
        if (!localReturnUrl) {return;} else {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(localReturnUrl);
        }
      }
    });
  }
}

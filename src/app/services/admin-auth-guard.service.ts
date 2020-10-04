import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .pipe(map(appUser => {
        if (appUser.userRole === 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }));
  }
}

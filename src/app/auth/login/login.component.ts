import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error;

  constructor(private auth: AuthService) { }

  onGoogleLogin() {
    this.auth.login().catch(error => this.error = error);
  }

  onSubmit(form) {
    this.auth.loginWithEmailPassword(form.value).catch(error => this.error = error);
    form.reset();
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  error;

  constructor(private auth: AuthService) { }

  onGoogleLogin() {
    this.auth.login().catch(error => this.error = error);
  }

  onSubmit(form) {
    this.auth.createUserWithEmailPassword(form.value).catch(error => this.error = error);
    form.reset();
  }

}

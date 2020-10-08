import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private auth: AuthService) { }

  onGoogleLogin() {
    this.auth.login();
  }

  onSubmit(form) {
    this.auth.createUserWithEmailPassword(form.value);
    form.reset();
  }

}

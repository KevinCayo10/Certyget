import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  togglePassword = true;
  constructor(private builder: FormBuilder) {
    sessionStorage.clear();
  }
  userdata: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {}
}

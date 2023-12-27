import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  togglePassword = true;
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  userdata: any;
  loginForm = this.builder.group({
    user_usu: this.builder.control('', Validators.required),
    pass_usu: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          user_usu: this.loginForm.value.user_usu,
          pass_usu: this.loginForm.value.pass_usu,
        })
        .subscribe((res) => {
          this.userdata = res;
          console.log(this.userdata);
          if (this.userdata.token) {
            sessionStorage.setItem('token', this.userdata.token);
            this.router.navigate(['/categorias']);
          } else {
            alert(
              this.userdata.pass_usu + '== ' + this.loginForm.value.pass_usu
            );
          }
        });
    }
  }
}

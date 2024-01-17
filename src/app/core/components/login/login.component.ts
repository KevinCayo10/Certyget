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
  // Variable para alternar la visibilidad de la contraseña
  togglePassword = true;
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Limpia la sesión al cargar el componente
    sessionStorage.clear();
  }
  // Variable para almacenar los datos del usuario
  userdata: any;
  // Definición del formulario de inicio de sesión usando FormBuilder
  loginForm = this.builder.group({
    user_usu: this.builder.control('', Validators.required),
    pass_usu: this.builder.control('', Validators.required),
  });
  // Método para procesar el inicio de sesión
  proceedLogin() {
    // Verifica si el formulario es válido
    if (this.loginForm.valid) {
      // Llama al servicio de autenticación para realizar el inicio de sesión
      this.authService
        .login({
          user_usu: this.loginForm.value.user_usu,
          pass_usu: this.loginForm.value.pass_usu,
        })
        .subscribe((res) => {
          this.userdata = res;
          console.log(this.userdata);
          // Verifica si el token está presente en la respuesta
          if (this.userdata.token) {
            // Almacena el token en la sesión y redirige a la página de categorías
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

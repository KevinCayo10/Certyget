import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Obtener una instancia del servicio de autenticación
  const authService = inject(AuthService);
  // Verificar si el usuario está autenticado
  if (authService.IsLoggedIn()) {
    return true;
  } else {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    inject(Router).navigate(['/login']);
    console.log('You are not logged in');
    return false;
  }
};

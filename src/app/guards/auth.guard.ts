import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.IsLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    console.log('You are not logged in');
    return false;
  }
};

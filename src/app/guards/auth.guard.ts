import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn === false) {
    console.log('false');
    inject(Router).navigate(['/login']);

    return false;
  }

  return true;
};

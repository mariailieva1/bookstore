import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) router.navigate(['/login']);

  return isAuthenticated;
};

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const isAdmin = await lastValueFrom(authService.isAdmin());

    if (!isAdmin) router.navigate(['/not-found']);

    return isAdmin;
  } catch {
    router.navigate(['/not-found']);
    return false;
  }
};

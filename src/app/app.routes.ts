import { Routes } from '@angular/router';
import { authGuard } from './guards';

export const routes: Routes = [
  {
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/chat/chat.component').then((c) => c.ChatComponent),
    path: 'chat',
  },
  {
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    path: 'login',
  },
  {
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    path: '',
  },
];

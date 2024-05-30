import { Routes } from '@angular/router';

export const routes: Routes = [
  {
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

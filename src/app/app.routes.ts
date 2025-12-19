import { canDeactivateGuard } from './core/guards/confirm.guard';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './login/login';
import { permissionGuard } from './core/guards/permission.guard';
import { Forbidden } from './forbidden/forbidden';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    
  },
  {
    path: 'user/:id',
   // loadComponent: () => import('./user-edit/user-edit').then(m => m.UserEdit),
    loadChildren: () => import('./user-edit/admin.routes').then(m => m.routes),
    data: {
      preload: true
    }
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'forbidden',
    component: Forbidden
  },
];

import { canDeactivateGuard } from './core/guards/confirm.guard';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './login/login';
import { permissionGuard } from './core/guards/permission.guard';
import { Forbidden } from './forbidden/forbidden';
import { Home } from './home/home';
import { routes as adminRoutes } from './user-edit/admin.routes'

export const routes: Routes = [
  {
    path: '',
    component: Home,
    
  },
  {
    path: 'user',
   // loadComponent: () => import('./user-edit/user-edit').then(m => m.UserEdit),
   // loadChildren: () => import('./user-edit/admin.routes').then(m => m.routes),
    data: {
      preload: false
    },
    children: [
      ...adminRoutes
    ]
   // canMatch: [authGuard]
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'forbidden',
    component: Forbidden
  },
  {
    path: '**',
    component: Forbidden
  }
];

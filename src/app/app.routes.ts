import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './login/login';
import { permissionGuard } from './core/guards/permission.guard';
import { Forbidden } from './forbidden/forbidden';

export const routes: Routes = [{
    path: 'user/:id',
    component: UserEdit,
    canActivate: [authGuard, permissionGuard],
    data: {
        requiredAuth: true,
        requiredPermissions: ['user.edit', 'user.delete']
    },
}, {
    path: 'login',
    component: Login
}, {
    path: 'forbidden',
    component: Forbidden
}];

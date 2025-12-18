import { Routes } from '@angular/router';
import { UserEdit } from './user-edit/user-edit';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './login/login';

export const routes: Routes = [{
    path: 'user/:id',
    component: UserEdit,
    canActivate: [authGuard],
    data: {
        requiredAuth: true
    },
}, {
    path: 'login',
    component: Login
}];

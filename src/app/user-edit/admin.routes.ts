import { ResolveFn, Routes } from '@angular/router';
import { UserEdit } from './user-edit';
import { canDeactivateGuard } from '../core/guards/confirm.guard';
import { authGuard } from '../core/guards/auth.guard';
import { permissionGuard } from '../core/guards/permission.guard';
import { User, UserService } from '../core/user-service';
import { inject } from '@angular/core';

enum Strategy {
  Me = 'me',
  User = 'user'
}

function loadUserStrategy(userId: number) {
  const userService = inject(UserService)
  return userService.getUser(userId)
}

function loadCurrentUserStrategy() {
  return loadUserStrategy(1)
}

const userResolver: ResolveFn<User> = (route) => {
    //const currentStrategy = route.data['strategy']
   const userId = route.paramMap.get('id')
   if (userId) {
      return loadUserStrategy(+userId)
   }
   return loadCurrentUserStrategy()
};

export const routes: Routes = [
  {
    path: 'me',
    component: UserEdit,
    resolve: {
      user: userResolver,
    },
    data: {
      strategy: Strategy.Me
    }
  },
  {
    path: ':id',
    component: UserEdit,
    canActivate: [authGuard, permissionGuard],
    canDeactivate: [canDeactivateGuard],
    data: {
      requiredAuth: true,
      requiredPermissions: ['user.edit', 'user.delete'],
      strategy: Strategy.User
    },
    resolve: {
      user: userResolver,
    },
  },
];

import { Routes } from "@angular/router";
import { UserEdit } from "./user-edit";
import { canDeactivateGuard } from "../core/guards/confirm.guard";
import { authGuard } from "../core/guards/auth.guard";
import { permissionGuard } from "../core/guards/permission.guard";

export const routes: Routes = [{
  path: '',
  component: UserEdit,
  canActivate: [authGuard, permissionGuard],
  canDeactivate: [canDeactivateGuard],
  data: {
    requiredAuth: true,
    requiredPermissions: ['user.edit', 'user.delete'],
  },
}]
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth";
import { map, of, switchMap } from "rxjs";
import { UserService } from "../user-service";

export const permissionGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService)
    const userService = inject(UserService)
    const router = inject(Router)
    const requiredPermissions = route.data['requiredPermissions'] as string[]

    if (!requiredPermissions) {
        return true
    }

    return authService.isConnected().pipe(
        // déjà fait par authGuard
        switchMap((isAuth) => {
            if (!isAuth) {
                return of(router.createUrlTree(['/login']))
            }
            return userService.getUser(1).pipe(
                map((user) => {
                    return requiredPermissions
                        .some(permission => user.permissions.includes(permission)) 
                        ? true
                        : router.createUrlTree(['/forbidden'])
                })
            )
        })
    )
}
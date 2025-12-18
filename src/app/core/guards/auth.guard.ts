import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth";
import { catchError, map } from "rxjs";

export const authGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return authService.isConnected().pipe(
        map((isAuth) => {
            return isAuth ? true : router.createUrlTree(['/login'])
        }),
        catchError((err) => {
            throw err
        })
    )
}
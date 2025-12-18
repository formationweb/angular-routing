import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { delay, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.path?.includes('user')) {
            return load()
        }
        else {
            return of(null)
        }
    }
}
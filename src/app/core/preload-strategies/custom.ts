import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

type CustomNavigator = {
    connection: {
        effectiveType: '2g' | '3g' | '4g'
    }
} | undefined

@Injectable({
    providedIn: 'root'
})
export class AdminPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        const shouldPreload = route.data?.['preload'] == true

        if (!shouldPreload) {
            return of(null)
        }

        const connection = (navigator as any as CustomNavigator)?.connection
        
        if (!connection) {
            return of(null)
        }

        if (connection.effectiveType == '2g') {
            console.log('Connection too slow')
            return of(null)
        }

        return load()
    }
}
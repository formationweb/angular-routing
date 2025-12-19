import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import { Loader } from "./loader";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private router = inject(Router)
    private overlay = inject(Overlay)
    private overlayRef: OverlayRef | null = null

    initialize() {
        const endNavigation = (event: Event): boolean => {
            return event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        }

        this.router.events
            .pipe(
                filter(event => {
                    return event instanceof NavigationStart || endNavigation(event as any)
                })
            )
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.createOverlay()
                    return
                }
                this.destroyOverlay()
            })
    }

    private createOverlay() {
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy: this.overlay
              .position()
              .global()
              .centerHorizontally()
              .centerVertically()
         })
         this.overlayRef.attach(new ComponentPortal(Loader))
    }

    private destroyOverlay() {
        if (this.overlayRef) {
            this.overlayRef.detach()
            this.overlayRef.dispose()
        }
    } 
}
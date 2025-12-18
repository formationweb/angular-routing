import { CanDeactivateFn } from "@angular/router";

export interface CanComponentDeactivate {
    modified(): boolean
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    if (component.modified()) {
        return window.confirm('souhaitez vous quitter ?')
    }
    return true
}
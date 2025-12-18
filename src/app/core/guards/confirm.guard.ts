import { Dialog } from "@angular/cdk/dialog";
import { inject } from "@angular/core";
import { CanDeactivateFn } from "@angular/router";
import { ConfirmDialog } from "../../components/confirm-dialog/confirm-dialog";
import { map } from "rxjs";

export interface CanComponentDeactivate {
    modified(): boolean
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    const dialog = inject(Dialog)

    if (typeof component.modified != 'function') {
        console.warn('...')
        return true
    }

    const isModified = component.modified()
    
    if (!isModified) {
        return true
    }

    const dialogRef = dialog.open<boolean>(ConfirmDialog)

    return dialogRef.closed.pipe(map(bool => !!bool))
}
import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";

export type DialogInput = {
    title: string
}

@Component({
    selector: 'app-user-dialog',
    template: `
        <div class="dialog">
            <h1>{{ data.title }}</h1>
            <button (click)="close()">Fermer</button>
        </div>
    `,
    styles: `
        .dialog {
            background-color: white;
        }
    `
})
export class UserDialog {
    private dialogRef = inject(DialogRef<void, DialogInput>)

    get data(): DialogInput {
        return this.dialogRef.config.data
    }

    close() {
        this.dialogRef.close()
    }
}
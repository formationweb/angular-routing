import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  template: `
    <div>
      <h1>Confirmer ?</h1>
      <button (click)="onCancel()">Annuler</button>
      <button (click)="onConfirm()">Ok</button>
    </div>
  `
})
export class ConfirmDialog {
  private dialogRef = inject(DialogRef<boolean>)

  onCancel() {
      this.dialogRef.close(false)
  }

  onConfirm() {
      this.dialogRef.close(true)
  }
}

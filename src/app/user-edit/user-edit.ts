import { Component, effect, inject, input, Input, numberAttribute, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User, UserService } from '../core/user-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../core/guards/confirm.guard';
import { Dialog } from '@angular/cdk/dialog';
import { DialogInput, UserDialog } from './user-dialog';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements CanComponentDeactivate {
  //  private route = inject(ActivatedRoute)
  //  private userService = inject(UserService)

  //  user = signal({} as User)

  //  ngOnInit(): void {
  //    const id = this.route.snapshot.paramMap.get('id')
  //    if (id) {
  //     this.userService.getUser(+id).subscribe((user) => {
  //       this.user.set(user)
  //     })
  //    }
  //  }

 private userService = inject(UserService)
 private builder = inject(FormBuilder)
 private dialog = inject(Dialog)

 form = this.builder.group({
  name: ''
 })

 id = input.required({
  transform: numberAttribute
 })
  user = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => {
        return this.userService.getUser(id)
      }),
      tap((user) => {
        this.form.patchValue(user)
      })
    )
  )

  modified(): boolean {
    return this.form.dirty
  }

  openRoleDialog() {
    const dialogRef = this.dialog.open<void, DialogInput>(UserDialog, {
      height: '400px',
      width: '600px',
      data: {
        title: 'Mon Titre'
      }
    })

    dialogRef.closed.subscribe(() => {
      console.log('fermé')
    })
  }
}

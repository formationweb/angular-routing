import { Component, effect, inject, input, Input, numberAttribute, OnInit, signal, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User, UserService } from '../core/user-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../core/guards/confirm.guard';
import { Dialog } from '@angular/cdk/dialog';
import { DialogInput, UserDialog } from './user-dialog';
import { AdminModule } from './admin.module';
import { HeavySimulationComponent } from '../components/heavy.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DrawerService } from '../core/drawer/drawer';

@Component({
  selector: 'app-test',
  template: `<h1>test</h1>`
})
class Test {}

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, RouterLink, HeavySimulationComponent],
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

 private builder = inject(FormBuilder)
 private dialog = inject(Dialog)
 private viewContainerRef = inject(ViewContainerRef)
 private drawerService = inject(DrawerService)

 drawer = viewChild<TemplateRef<any>>('drawerTpl')

 form = this.builder.group({
  name: ''
 })

 id = input.required({
  transform: numberAttribute
 })
 user = input.required<User>()
  // user = toSignal(
  //   toObservable(this.id).pipe(
  //     switchMap((id) => {
  //       return this.userService.getUser(id)
  //     }),
  //     tap((user) => {
  //       this.form.patchValue(user)
  //     })
  //   )
  // )

  constructor() {
    effect(() => {
      this.form.patchValue(this.user())
    })
  }

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

  edit() {
     this.drawerService.open(this.drawer()!, this.viewContainerRef)
  }
}
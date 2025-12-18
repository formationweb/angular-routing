import { Component, effect, inject, input, Input, numberAttribute, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../core/user-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
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

 id = input.required({
  transform: numberAttribute
 })
  user = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => {
        return this.userService.getUser(id)
      })
    )
  )
}

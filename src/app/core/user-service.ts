import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface User {
  id: number
  name: string
  permissions: string[] // ['user.read', 'user.edit']
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)

  readonly url = 'https://jsonplaceholder.typicode.com/users'

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id).pipe(
      map((user) => {
        return {
          ...user,
          permissions: ['user.read', 'user.edit']
        }
      })
    )
  }
}

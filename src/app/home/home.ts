import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //isConnected = signal(false)
  isConnected = new BehaviorSubject(false)

  constructor() {
    setTimeout(() => {
      this.isConnected.next(true)
    }, 5000)
  }
}

import { Component, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp');
  private router = inject(Router)

  constructor() {
    this.router.events.subscribe((event) => {
       if (event instanceof NavigationStart) {
        console.log(event.id)
       }
    })
  }
}

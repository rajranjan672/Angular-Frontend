import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  // Navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Navigate to register page
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

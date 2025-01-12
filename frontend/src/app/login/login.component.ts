import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Make sure these are included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  // Login method that calls the UserService to authenticate the user
  login() {
    if (this.email && this.password) {
      const userCredentials = { email: this.email, password: this.password };

      this.loading = true;

      // Call the loginUser method from UserService
      this.userService.loginUser(userCredentials).subscribe(
        (user) => {
          console.log('Login successful:', user);
          this.loading = false;

          // After successful login, navigate to /tasks page
          this.router.navigate(['/tasks']); // Make sure your route is correct
        },
        (error) => {
          console.error('Login failed:', error);
          this.loading = false;
          alert('Invalid credentials. Please try again.');
        }
      );
    } else {
      alert('Please enter your email and password');
    }
  }
}

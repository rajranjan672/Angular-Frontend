import { Component } from '@angular/core';
import { User, UserService } from '../Services/UserService';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = ''; // Role selected by the user
  loading: boolean = false;

  constructor(private userService: UserService, private router:  Router) {}

  // Register method to call the createUser API
  Register() {
    if (this.username && this.email && this.password && this.role) {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      };

      this.loading = true;
      this.userService.createUser(newUser).subscribe(
        (user) => {
          console.log('User registered successfully:', user);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
          this.loading = false;
        }
      );
    } else {
      console.log('Please fill all the fields');
    }
  }
}

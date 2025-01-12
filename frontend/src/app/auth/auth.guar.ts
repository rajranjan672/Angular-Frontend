import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the 'access_token' cookie exists
    const token = this.getCookie('access_token');

    // If the token doesn't exist, redirect to the login page
    if (!token) {
      this.router.navigate(['/login']);
      return false;  // Block access to the route
    }

    return true;  // Allow access to the route
  }

  // Helper method to get a specific cookie by name
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}

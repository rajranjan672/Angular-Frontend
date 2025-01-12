import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    _id: string ;
    username: string ;
    email: string;
    password: string;
    role: string;
}

export interface ApiResponse {
    success: boolean;
    data: User[];
  }

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:3001/api/user';

    constructor(private http: HttpClient) {}

    createUser(item: { title: string; description: string;  }): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, item);
      }


    }

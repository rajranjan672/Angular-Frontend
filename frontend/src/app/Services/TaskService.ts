import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
    _id: string ;
    title: string ;
    description: string;
    status: string;
}

export interface ApiResponse {
    success: boolean;
    data: Task[];
  }

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:3001/api/task';

    constructor(private http: HttpClient) {}

    createTask(item: { title: string; description: string;  }): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/create`, item);
      }

    getTasks(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/get`);
    }

  
    updateTask(id: string, item: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/update/${id}`, item);
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}

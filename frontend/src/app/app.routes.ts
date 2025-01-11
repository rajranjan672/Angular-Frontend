import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }, //default route
    // {
    //     path: 'tasks',
    //     loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
    //   },
    { path: 'tasks', component: TaskComponent },
    { path: 'users', component: UsersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
];

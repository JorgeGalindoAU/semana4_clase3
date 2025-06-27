import { Routes } from '@angular/router';
import { MainScreenComponent } from '../screens/main-screen/main-screen.component';
import { UsersScreenComponent } from '../screens/users-screen/users-screen.component';
import { CreateUserScreenComponent } from '../screens/create-user-screen/create-user-screen.component';
import { LoginScreenComponent } from '../screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from '../screens/register-screen/register-screen.component';
import { authGuard } from '../guards/auth.guard';

const title: string = 'Mi Primera Aplicación';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'login', component: LoginScreenComponent, title: "Login" },
    { path: 'register', component: RegisterScreenComponent, title: "Register" },
    { path: 'menu', component: MainScreenComponent, title: title, canActivate: [authGuard] },
    { path: 'users', component: UsersScreenComponent, title: title, canActivate: [authGuard] },
    { path: 'users/create', component: CreateUserScreenComponent, title: title, canActivate: [authGuard] },
    { path: '**', redirectTo: 'menu', pathMatch: 'full' },
];
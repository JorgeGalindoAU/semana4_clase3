import { Component, computed, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { RouterLink } from '@angular/router';
import { AuthenticationFormAction } from '../../types/types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-screen',
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
  authService: AuthService = inject(AuthService);

  errorMessage = computed(() => this.authService.errorMessageLogin());

  login(action: AuthenticationFormAction) {
    this.authService.login(action.email, action.password);
  }
}

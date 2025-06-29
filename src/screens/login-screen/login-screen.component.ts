import { Component, computed, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticationFormAction } from '../../models/types/types';

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

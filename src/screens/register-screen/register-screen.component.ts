import { Component, computed, inject } from '@angular/core';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthenticationFormAction } from '../../types/types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-screen',
  imports: [GoBackButtonComponent, AuthFormComponent],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})
export class RegisterScreenComponent {
  authService: AuthService = inject(AuthService);

  errorMessage = computed(() => this.authService.errorMessageRegister());

  register(action: AuthenticationFormAction) {
    this.authService.register(action.email, action.password);
  }
}

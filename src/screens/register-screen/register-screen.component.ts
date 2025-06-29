import { Component, computed, inject } from '@angular/core';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthService } from '../../services/auth.service';
import { AuthenticationFormAction } from '../../models/types/types';

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

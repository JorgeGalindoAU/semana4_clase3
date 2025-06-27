import { Component, computed, effect, inject, input, InputSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
  standalone: true,
})
export class AuthFormComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  title: InputSignal<string> = input('');

  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  isEmailValid = signal<boolean>(false);
  isPasswordValid = signal<boolean>(false);
  isFormValid = computed<boolean>(() => this.isEmailValid() && this.isPasswordValid());

  ngOnInit(): void {
    let emailControl = this.loginForm.get('email');
    let passwordControl = this.loginForm.get('password');

    if (emailControl != null && passwordControl != null) {
      emailControl?.statusChanges.subscribe(() => {
        this.isEmailValid.set((emailControl?.valid ?? false) &&
          (emailControl?.value !== null) &&
          (emailControl?.value !== ''));
      });

      passwordControl?.statusChanges.subscribe(() => {
        this.isPasswordValid.set((passwordControl?.valid ?? false) &&
          (passwordControl?.value !== null) &&
          (passwordControl?.value !== ''));
      });
    }
  }

  loginForm = new FormGroup(
    {
      email: new FormControl<string>(
        {
          value: '',
          disabled: this.isEmailValid()
        },
        [Validators.required]
      ),
      password: new FormControl<string>(
        {
          value: '',
          disabled: this.isPasswordValid()
        }, [Validators.required]
      ),
    }
  );

  executeAuthentication() {
    let email: string = this.loginForm.get('email')!.value!;
    let password: string = this.loginForm.get('password')!.value!;

    this.authService.login(email, password);
  }
}

import { Component, computed, effect, inject, input, InputSignal, OnInit, output, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AuthenticationFormAction } from '../../models/types/types';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
  standalone: true,
})
export class AuthFormComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  title: InputSignal<string> = input('');
  onSubmit = output<AuthenticationFormAction>();

  emailValue = signal<string>('');
  passwordValue = signal<string>('');

  isEmailValid = signal<boolean>(false);
  isPasswordValid = signal<boolean>(false);

  isFormTouched = signal<boolean>(false);
  isFormValid = computed<boolean>(() => this.isEmailValid() && this.isPasswordValid());

  loginForm = new FormGroup(
    {
      email: new FormControl<string>(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl<string>(
        '',
        [Validators.required, Validators.minLength(6)]
      ),
    }
  );

  constructor() {
    let emailControl = this.loginForm.get('email');
    let passwordControl = this.loginForm.get('password');

    // el usuario al menos ha metido algo en el formulario
    this.isFormTouched = toSignal(this.loginForm.valueChanges.pipe(
      map((form) => (form.email !== null && form.email !== '') ||
        (form.password !== null && form.password !== ''))
    ),
      { initialValue: false }
    ) as WritableSignal<boolean>;

    if (emailControl != null && passwordControl != null) {
      // 1. de observable a signal revisando el valor emitido en el observable statusChanges
      this.isEmailValid = toSignal(emailControl.statusChanges
        .pipe(
          map((status: FormControlStatus) => {
            return status === 'VALID'
              && emailControl.value !== ''
              && emailControl.dirty;
          }),
        ),
      ) as WritableSignal<boolean>;

      // 2. nos subscribimos al observable, y según cambien los valores, 
      // revisamos 'passwordControl' y su campo 'valid'
      passwordControl?.statusChanges.subscribe(() => {
        let isValid: boolean = passwordControl.valid
          && passwordControl.value !== ''
          && emailControl.dirty;

        this.isPasswordValid.set(isValid);
      });

      // rellenar nuestras señales
      this.emailValue = toSignal(emailControl.valueChanges) as WritableSignal<string>;
      this.passwordValue = toSignal(passwordControl.valueChanges) as WritableSignal<string>;
    }
  }

  submitAuth() {
    let email: string = this.loginForm.get('email')!.value!;
    let password: string = this.loginForm.get('password')!.value!;

    let action: AuthenticationFormAction = {
      email: email,
      password: password
    };

    // emitir valor al padre (quien escuche)
    this.onSubmit.emit(action);
  }
}

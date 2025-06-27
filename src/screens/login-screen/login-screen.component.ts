import { Component } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

}

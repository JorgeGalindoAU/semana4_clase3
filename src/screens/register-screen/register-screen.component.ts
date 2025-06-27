import { Component } from '@angular/core';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
  selector: 'app-register-screen',
  imports: [GoBackButtonComponent, AuthFormComponent],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})
export class RegisterScreenComponent {

}

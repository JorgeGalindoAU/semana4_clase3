import { Component, inject, signal } from '@angular/core';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUserCreated, IUserJob } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-user-screen',
  imports: [GoBackButtonComponent, FormsModule, CommonModule],
  templateUrl: './create-user-screen.component.html',
  styleUrl: './create-user-screen.component.css'
})
export class CreateUserScreenComponent {
  private userService: UserService = inject(UserService);

  isLoading = signal<boolean>(false);
  isCreated = signal<boolean>(false);
  userCreated = signal<IUserCreated | undefined>(undefined);

  userJob: IUserJob = {
    name: "",
    job: ""
  };

  createUser() {
    this.isLoading.set(true);

    this.userService.createUser(this.userJob)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe(
        {
          next: (user: IUserCreated) => this.userCreated.set(user),
          error: (err) => console.error(err),
          complete: () => this.isCreated.set(true),
        }
      );
  }
}

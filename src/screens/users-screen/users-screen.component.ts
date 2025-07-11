import { Component, inject, OnInit, signal } from '@angular/core';
import { ActiveFilterComponent } from "../../components/active-filter/active-filter.component";
import { Pagination } from '../../components/pagination/pagination.component';
import { UserService } from '../../services/user.service';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Spinner } from "../../components/spinner/spinner.component";
import { IUser } from '../../models/interfaces/user.interface';
import { IUserPagination } from '../../models/interfaces/user_pagination.interface';

@Component({
  selector: 'app-users-screen',
  imports: [ActiveFilterComponent, ActiveFilterComponent, Pagination, GoBackButtonComponent, RouterLink, Spinner],
  templateUrl: './users-screen.component.html',
  styleUrl: './users-screen.component.css'
})
export class UsersScreenComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users = signal<IUser[]>([]);
  currentPage = signal<number>(1);
  currentCount = signal<number>(1);
  totalPages = signal<number>(1);

  showInactive = signal<boolean>(false);
  showExternals = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.getUsers();
  }

  showInactiveUsers(value: boolean) {
    this.showInactive.set(value);
  }

  showExternalUsers(value: boolean) {
    this.showExternals.set(value);
  }

  receivedNewPage(page: number) {
    this.currentPage.set(page);

    this.getUsers();
  }

  receivedNewCount(count: number) {
    this.currentCount.set(count);

    this.getUsers();
  }

  getUsers() {
    this.isLoading.set(true);
    this.userService.getUsers(this.currentCount(), this.currentPage())
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(
        {
          next: (value: IUserPagination) => {
            this.totalPages.set(value.total_pages);

            let users: IUser[] = value.data;
            this.users.set(users);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);

            this.errorMessage.set(err.message);
          }
        }
      );
  }
}

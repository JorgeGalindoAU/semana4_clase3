import { Component, inject, OnInit, signal } from '@angular/core';
import { ActiveFilterComponent } from "../../components/active-filter/active-filter.component";
import { Pagination } from '../../components/pagination/pagination.component';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { IUserPagination } from '../../interfaces/user_pagination.interface';
import { GoBackButtonComponent } from "../../components/go-back-button/go-back-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-screen',
  imports: [ActiveFilterComponent, ActiveFilterComponent, Pagination, GoBackButtonComponent, RouterLink],
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
    this.userService.getUsers(this.currentCount(), this.currentPage())
      .subscribe(
        {
          next: (value: IUserPagination) => {
            this.totalPages.set(value.total_pages);

            let users: IUser[] = value.data;
            this.users.set(users);
          },
          error: (err) => console.error(err), // NOK
        }
      );
  }
}

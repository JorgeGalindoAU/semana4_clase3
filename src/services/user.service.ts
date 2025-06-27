import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserPagination } from '../interfaces/user_pagination.interface';
import { environment } from '../environments/environment';
import { IUserCreated, IUserJob } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ENDPOINT_URL: string = `${environment.api.url}/api/users`;

  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getUsers(perPage: number, page: number): Observable<IUserPagination> {
    return this.httpClient.get(`${this.ENDPOINT_URL}?delay=1&per_page=${perPage}&page=${page}`) as Observable<IUserPagination>;
  }

  createUser(user: IUserJob): Observable<IUserCreated> {
    return this.httpClient.post(`${this.ENDPOINT_URL}?delay=3`, user) as Observable<IUserCreated>;
  }
}

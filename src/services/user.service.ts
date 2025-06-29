import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environments/environment.prod';
import { IUserCreated, IUserJob } from '../models/interfaces/user.interface';
import { IUserPagination } from '../models/interfaces/user_pagination.interface';

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

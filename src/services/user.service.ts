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
  private ENDPOINT_API_HEADER: string = environment.api.headerName;
  private ENDPOINT_API_KEY: string = environment.api.apiKey;

  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getUsers(perPage: number, page: number): Observable<IUserPagination> {
    return this.httpClient.get(`${this.ENDPOINT_URL}?per_page=${perPage}&page=${page}`, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      },
    }) as Observable<IUserPagination>;
  }

  createUser(user: IUserJob): Observable<IUserCreated> {
    return this.httpClient.post(`${this.ENDPOINT_URL}?delay=3`, user, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      },
    }) as Observable<IUserCreated>;
  }
}

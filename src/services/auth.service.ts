import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT_URL_LOGIN: string = `${environment.api.url}/api/login`;
  private ENDPOINT_URL_REGISTER: string = `${environment.api.url}/api/register`;

  private ENDPOINT_API_HEADER: string = environment.api.headerName;
  private ENDPOINT_API_KEY: string = environment.api.apiKey;

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly _userToken = signal<string>(localStorage.getItem('token') ?? '');
  private readonly _isUserLogged = computed(() => this._userToken() != '');

  errorMessage = signal<string | null>(null);

  public get isUserLogged() {
    const currentToken: string = localStorage.getItem('token') ?? '';
    this._userToken.set(currentToken);

    return this._isUserLogged();
  }


  login(email: string, password: string): void {
    this.httpClient.post(this.ENDPOINT_URL_LOGIN, {
      email: email,
      password: password,
    }, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      }
    }).subscribe(
      {
        next: (value: any) => {
          let token = value['token'];
          localStorage.setItem('token', token);

          this._userToken.set(token);

          this.router.navigate(['/menu']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(`Error en la autenticación: ${err.message}`);
        }
      }
    );
  }

  register(email: string, password: string): void {
    this.httpClient.post(this.ENDPOINT_URL_REGISTER,
      {
        email: email,
        password: password,
      }, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      },
    }).subscribe(
      {
        next: (value: any) => {
          let token = value['token'];
          localStorage.setItem('token', token);

          this._userToken.set(token);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(`Error al registrar: ${err.message}`);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');

    this._userToken.set('');
  }
}

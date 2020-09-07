import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';

  constructor(
    private http: HttpClient
  ) {}

  signUp(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.URL, user);
  }
}

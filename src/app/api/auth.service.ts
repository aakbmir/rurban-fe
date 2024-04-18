import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;

  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  authenticate(credentials: any, callback: any) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              'Basic ' +
              btoa(credentials.username + ':' + credentials.password),
          }
        : {}
    );

    this.http.get('user', { headers: headers }).subscribe((response: any) => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });
  }

  register(req: any) {
    return this.http.post(`${this.API_URL}register`, req);
  }

  login(req: any) {
    return this.http.post(`${this.API_URL}login`, req);
  }
}

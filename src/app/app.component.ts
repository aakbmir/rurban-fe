import { Component } from '@angular/core';
import { AuthService } from './api/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private app: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
}

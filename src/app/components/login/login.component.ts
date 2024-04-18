import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userType: any = 'Patient';
  screen: any = 'signup';

  formData: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  switchUser(userObj: string) {
    this.userType = userObj;
  }

  switchpar(obj: string) {
    this.screen = obj;
  }
  change(event: any) {
    this.screen = event;
  }

  login() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('email', this.formData?.get('email')?.value);
      formData.append('password', this.formData?.get('password')?.value);
      console.log(this.formData);
      // this.auth.userLogin(formData).subscribe((data: any) => {
      //   console.log(data);
      // });
    }
  }

  register() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('name', this.formData?.get('name')?.value);
      formData.append('email', this.formData?.get('email')?.value);
      formData.append('password', this.formData?.get('password')?.value);
      console.log(this.formData);
      // this.auth.userRegister(formData).subscribe((data: any) => {
      //   console.log(data);
      // });
    }
  }
}

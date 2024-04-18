import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  userType: any = 'Patient';
  signInForm: FormGroup | any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      registerType: [this.userType],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.signInForm.controls;
  }

  switchUser(userObj: string) {
    this.signInForm.controls.registerType.setValue(userObj);
    this.userType = userObj;
  }

  submitForm = () => {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
      this.auth.login(this.signInForm.value).subscribe((data) => {
        console.log(data);
      });
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };

  navigate(hh: any) {
    this.router.navigateByUrl('/signup');
    console.log('first');
  }
}

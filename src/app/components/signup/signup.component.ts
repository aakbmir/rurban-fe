import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userType: any = 'Patient';
  isToastOpen = false;

  patientForm: FormGroup | any;
  hospitalForm: FormGroup | any;

  isLoading = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  switchUser(userObj: string) {
    this.userType = userObj;
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      name: ['Aaqib', [Validators.required, Validators.minLength(4)]],
      dob: ['16011989', [Validators.required]],
      registerType: ['Patient'],
      email: [
        'aakbmir@gmail.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phone: [
        '0545657002',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      password: [
        'Qwert@1234$',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{10,}/
          ),
        ]),
      ],
      confirmPassword: [
        'Qwert@1234$',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{10,}/
          ),
        ]),
      ],
    });

    this.hospitalForm = this.formBuilder.group({
      name: ['Aaqib', [Validators.required, Validators.minLength(4)]],
      registerType: ['Hospital'],
      email: [
        'aakbmir@gmail.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phone: [
        '0545657002',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      password: [
        'Qwert@1234$',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{10,}/
          ),
        ]),
      ],
      confirmPassword: [
        'Qwert@1234$',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{10,}/
          ),
        ]),
      ],
    });
  }

  submitPatientForm() {
    this.isLoading = true;
    this.patientForm.controls['registerType'].setValue(this.userType);
    this.authService.register(this.patientForm.value).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.presentToast('bottom', 'Successfully Registered');
        this.router.navigateByUrl('/signin');
      },
      (error) => {
        console.log(error.error);
        this.presentToast('bottom', error.error);
        this.isLoading = false;
      }
    );
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'toast',
      duration: 5000,
      position: position,
      color: 'warning',
    });

    await toast.present();
  }

  submitHospitalForm() {
    this.isLoading = true;
    this.hospitalForm.controls['registerType'].setValue(this.userType);
    this.authService.register(this.hospitalForm.value).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.presentToast('bottom', 'Successfully Registered');
        this.router.navigateByUrl('/signin');
      },
      (error) => {
        console.log(error.error);
        this.presentToast('bottom', error.error);
        this.isLoading = false;
      }
    );
  }

  get errorPatientControl() {
    return this.patientForm.controls;
  }

  get errorHospitalControl() {
    return this.hospitalForm.controls;
  }

  navigate() {
    this.router.navigateByUrl('/signin');
  }
}

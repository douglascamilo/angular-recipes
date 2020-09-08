import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './user';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth-helper.service';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [ AuthHelper ]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  authForm: FormGroup;

  constructor(
    private helper: AuthHelper,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authForm = this.helper.initForm();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    this.isLoading = true;

    const dataForm = this.authForm.getRawValue();
    const user = new User(dataForm.email, dataForm.password);

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(user)
        .subscribe(
          authResponse => {
            this.isLoading = false;
            this.authForm.reset();
            this.alertService.onSuccess('User was created successfully!');
          },
          error => {
            this.alertService.onError('An error has occurred!');
            this.isLoading = false;
          });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './user';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth-helper.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [ AuthHelper ]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;

  constructor(
    private helper: AuthHelper,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.helper.initForm();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    const dataForm = this.authForm.getRawValue();
    const user = new User(dataForm.email, dataForm.password);

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(user)
        .subscribe(
          authResponse => console.log(authResponse),
          error => console.error(error));
    }
  }
}

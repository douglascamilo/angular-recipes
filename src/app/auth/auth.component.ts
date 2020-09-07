import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(): void {
    const dataForm = this.authForm.getRawValue() as User;
    console.log(dataForm);
    this.authForm.reset();
  }

  private initForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl('',
        [ Validators.required, Validators.email ]),
      password: new FormControl('',
        [ Validators.required, Validators.minLength(6) ])
    });
  }
}

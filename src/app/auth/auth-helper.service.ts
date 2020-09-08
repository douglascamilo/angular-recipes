import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AuthHelper {

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('',
        [ Validators.required, Validators.email ]),
      password: new FormControl('',
        [ Validators.required, Validators.minLength(6) ])
    });
  }
}

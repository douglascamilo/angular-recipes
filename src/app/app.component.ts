import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  genders = [ 'male', 'female', 'not-specified' ];
  signupForm: FormGroup;
  forbiddenUsernames = [ 'Chris', 'Anna' ];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [ Validators.required, this.forbiddenNames.bind(this) ]),
        'email': new FormControl(null, [ Validators.email, Validators.required ]),
      }),
      'gender': new FormControl('not-specified'),
      'hobbies': new FormArray([]),
    });
  }

  onSubmit(): void {
    console.log(this.signupForm.value);
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  getHobbyControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): null | { nameIsForbidden: true } {
    if (this.forbiddenUsernames.indexOf(control.value) >= 0) {
      return { nameIsForbidden: true };
    }

    return null;
  }
}

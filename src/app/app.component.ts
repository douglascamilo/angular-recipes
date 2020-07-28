import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  genders = [ 'male', 'female', 'not-specified' ];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [ Validators.required ]),
      'email': new FormControl(null, [ Validators.email, Validators.required ]),
      'gender': new FormControl('not-specified'),
    });
  }

  onSubmit(): void {
    console.log(this.signupForm.value);
  }
}

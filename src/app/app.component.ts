import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('formObject', { static: false }) form: NgForm;
  answer = '';
  genders = [ 'male', 'female' ];

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(formObject: NgForm): void {
  //   console.log(formObject);
  // }

  onSubmit(): void {
    console.log(this.form);
  }
}

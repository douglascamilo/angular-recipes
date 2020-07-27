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

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(formObject: NgForm): void {
  //   console.log(formObject);
  // }

  onSubmit(): void {
    console.log(this.form);
  }
}

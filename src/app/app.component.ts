import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])  
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  genders = ['male', 'female'];
  signupForm: FormGroup;

  onSubmit() {
    console.log(this.signupForm);
  }
  
  onAddHobby() {
    const formControl = new FormControl(null);
    (this.signupForm.get('hobbies') as FormArray).push(formControl);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}

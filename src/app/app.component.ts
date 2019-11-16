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
        'username': new FormControl(null, [Validators.required, this.isForbiddenName]),
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

  forbiddenNames = ['Chris', 'Anna'];

  isForbiddenName = (control: FormControl): {[key: string]: boolean} => {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'isForbiddenName': true};
    }
    // should return null or nothing for successful validation case.
    return null;
  }
}

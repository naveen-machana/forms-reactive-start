import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.isForbiddenEmail)  
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    //this.signupForm.valueChanges.subscribe((value) => {
    //  console.log(value);
    //});
    this.signupForm.statusChanges.subscribe(status => {
      console.log(status);
    });

    this.signupForm.setValue({
      userData: {
        username: 'Naveen',
        email: 'naveen@get.com'
      },
      gender: 'male',
      hobbies: []
    });

    this.signupForm.patchValue({
      userData: {
        username: 'Kumar',
      }
    });
  }
  genders = ['male', 'female'];
  signupForm: FormGroup;

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
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

  isForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'isForbiddenEmail': true});
        }
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}

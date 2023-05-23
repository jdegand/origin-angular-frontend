import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(private builder: FormBuilder, private apiService: ApiService, private router: Router) { }
  isLinear: boolean = true;
  response: any;

  personalInfo = this.builder.group({
    personal: this.builder.group({
      age: this.builder.control('', [Validators.required, Validators.min(18), Validators.max(85)]),
      income: this.builder.control('', Validators.required),
      marital_status: this.builder.control('', Validators.required)
    }),
    house: this.builder.group({
      ownership_status: this.builder.control('', Validators.required),
      dependents: this.builder.control('', Validators.required)
    }),
    vehicle: this.builder.group({
      year: this.builder.control('', [Validators.required, Validators.min(1960), Validators.max(new Date().getFullYear() + 1)])
    }),
    questions: this.builder.group({
      question1: this.builder.control('', Validators.required),
      question2: this.builder.control('', Validators.required),
      question3: this.builder.control('', Validators.required),
    })
  })

  get personalGroup() {
    return this.personalInfo.get('personal') as FormGroup;
  }

  get houseGroup() {
    return this.personalInfo.get('house') as FormGroup;
  }

  get vehicleGroup() {
    return this.personalInfo.get('vehicle') as FormGroup;
  }

  get questionsGroup() {
    return this.personalInfo.get('questions') as FormGroup;
  }

  submit() {
    if (this.personalInfo.valid) {

      this.apiService.postData(this.personalInfo.value).subscribe((res) => {

        this.response = res;

        // put the router change inside the subscribe
        this.router.navigate(
          ['approval'],
          { state: { data: res } }
        );
      }
      );

      // putting navigate after the subscribe makes this.response undefined 
      // this.router.navigate(['approval'], {state: this.response});
      // this.router.navigateByUrl('/approval', { state: this.response });



    }
  }
}

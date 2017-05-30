import { Component, OnInit } from '@angular/core';
import {CompoundService} from "../compound.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailValidators, UniversalValidators} from "ng2-validators";

@Component({
  selector: 'app-create-compound-set',
  templateUrl: './create-compound-set.component.html',
  styleUrls: ['./create-compound-set.component.scss']
})
export class CreateCompoundSetComponent implements OnInit {

  createForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, EmailValidators.normal])),
    name: new FormControl('', Validators.required),
    dataset: new FormControl('', Validators.required)
  });

  formErrors = {
    email: '',
    name: '',
    dataset: ''
  };

  validationMessages = {
    'email': {
      'required': 'You must enter an email',
      'email': 'You must enter a valid email'
    },
    'name': {
      'required': 'You must enter a name for your dataset',
    },
    'dataset': {
      'required': 'You must provide a dataset in JSON format'
    }
  };

  constructor(private compoundService: CompoundService) { }

  ngOnInit() {
    this.createForm.valueChanges
      .debounceTime(200)
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.createForm) { return; }

    const form = this.createForm;

    // Validation
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  save() {
    if (! this.createForm.valid) { return; };
    const formVal = this.createForm.value;
    this.compoundService.create(formVal.email, formVal.name, formVal.dataset)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  }

}

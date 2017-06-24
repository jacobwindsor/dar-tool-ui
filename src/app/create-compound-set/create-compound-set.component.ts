import {Component, OnInit, ViewChild} from '@angular/core';
import {CompoundService} from "../compound.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailValidators, UniversalValidators} from "ng2-validators";
import {NotifierService} from "../notifier.service";
import * as CSVParse from "csv-parse";

@Component({
  selector: 'app-create-compound-set',
  templateUrl: './create-compound-set.component.html',
  styleUrls: ['./create-compound-set.component.scss']
})
export class CreateCompoundSetComponent implements OnInit {

  isDatasetAvailable: boolean;
  isParsing: boolean;

  @ViewChild('fileInput') fileInput;

  createForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, EmailValidators.normal])),
    name: new FormControl('', Validators.required),
  });

  formErrors = {
    email: '',
    name: ''
  };

  validationMessages = {
    'email': {
      'required': 'You must enter an email',
      'email': 'You must enter a valid email'
    },
    'name': {
      'required': 'You must enter a name for your dataset',
    },
  };

  private datasetJSON: string;

  constructor(private compoundService: CompoundService, private notifier: NotifierService) { }

  ngOnInit() {
    this.isDatasetAvailable = false;
    this.isParsing = false;
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
    if (! this.datasetJSON ) {
      this.notifier.notify('Can\'t save, there\'s no data!', 'error');
      return;
    }
    this.compoundService.create(formVal.email, formVal.name, this.datasetJSON)
      .then(msg => this.notifier.notify(msg.message, 'success'))
      .catch(err => this.notifier.notify(err.message, 'error'));
  }

  cancel() {
    this.isDatasetAvailable = false;
    this.isParsing = false;
    this.datasetJSON = null;
  }

  onUploadButtonClick() {
    this.fileInput.nativeElement.click();
  }

  onFileInputChange(event) {

    this.isParsing = true;
    const fileList = event.target.files;
    if (fileList.length > 1 ) {
      this.notifier.notify('You cannot upload multiple files!', 'error');
      return;
    }
    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      CSVParse(csv,
        // Set to = 201 so can provide error if over 200
        { rtrim: true, skip_empty_lines: true, to: 201, columns: ['IUPAC', 'CAS']},
        (err, compounds) => {
          if (err) {
            this.notifier.notify('An error occured while parsing your file. Please check the file is ok', 'error');
            return;
          }
          if (compounds.length < 1) {
            this.notifier.notify('There must be at least one row of data in the file.', 'error');
            return;
          }
          if (compounds.length > 200) {
            this.notifier.notify('There cannot be more than 200 rows of data in the file. ' +
              'Please split up your data into different files', 'error');
            return;
          }
          this.datasetJSON = JSON.stringify(compounds);
          this.isDatasetAvailable = true;
          this.isParsing = false;
      });
    };

    reader.readAsText(file);

    // allow reselection of same file
    this.fileInput.nativeElement.value = null;
  }
}

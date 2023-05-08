import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../book-list/book.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BookFormField } from './book-form-field';
import { errorMessages } from './error-messages';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent {
  @Output() add = new EventEmitter<Book>();
  bookForm: FormGroup;
  // representation of form in the array
  formFields: Array<BookFormField> = [
    {
      name: 'title',
      label: 'Title',
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]
    },
    {
      name: 'author',
      label: 'Author',
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]
    },
    {
      name: 'publicationDate',
      label: 'Publication date(year)',
      validators: [
        Validators.required,
        Validators.pattern('[0-9]{1,4}'),
        this.isPastYearValidator
      ]
    },
  ];

  constructor() {
    // creates the FormGroup accordingly to formFields array
    const formGroupDetails: { [key:string]: FormControl } = {};
    this.formFields.forEach(field => {
      formGroupDetails[field.name] = field.validators ?
        new FormControl('', field.validators)
        : new FormControl('')
    });
    this.bookForm = new FormGroup(formGroupDetails);
  }

  addBook(): void {
    this.add.emit({
      title: this.bookForm?.controls['title'].value,
      author: this.bookForm?.controls['author'].value,
      publicationDate: this.bookForm?.controls['publicationDate'].value
    });
  }

  getFormControl(name: string): FormControl {
    return this.bookForm.controls[name] as FormControl;
  }

  // custom validator to check if the published date is from a future year
  isPastYearValidator(control:AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value);

    if (!value) {
      return null;
    }

    if(Number.isNaN(value) || value > new Date().getFullYear()) {
      return { pastYear : true };
    }

    return null;
  }
  
  getErrorMessage(fieldName: string) {
    const control: FormControl = this.getFormControl(fieldName);
    // gets the error list from the control
    const errors = Object.keys(control.errors as Object);

    return errors.length ? errorMessages[errors[0]] : '';
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BookFormComponent } from './book-form.component';
import { Book } from '../book-list/book.model';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ BookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on addBook() call', () => {
    const book: Book = {
      title: 'Test Title',
      author: 'Test Author',
      publicationDate: '2020',
    };

    jest.spyOn(component.add, 'emit');

    component.bookForm.setValue(book);

    component.addBook();

    expect(component.add.emit).toHaveBeenCalledWith(book);
  });

  it('should validate the form fields', () => {
    const titleControl = component.getFormControl('title');
    const authorControl = component.getFormControl('author');
    const publicationDateControl = component.getFormControl('publicationDate');

    titleControl.setValue('Test');
    authorControl.setValue('Test');
    publicationDateControl.setValue('2222');

    expect(component.bookForm.valid).toBeFalsy();

    titleControl.setValue('Test Title');
    authorControl.setValue('Test Author');
    publicationDateControl.setValue('2020');

    expect(component.bookForm.valid).toBeTruthy();
  });

  it('should return the correct error message for each form field', () => {
    const titleControl = component.getFormControl('title');
    const authorControl = component.getFormControl('author');
    const publicationDateControl = component.getFormControl('publicationDate');

    titleControl.setValue('');
    authorControl.setValue('Test Author');
    publicationDateControl.setValue('2022');

    expect(component.getErrorMessage('title')).toBe('This field is required');

    titleControl.setValue('Test Title');
    authorControl.setValue('');
    publicationDateControl.setValue('2022');

    expect(component.getErrorMessage('author')).toBe('This field is required');

    titleControl.setValue('Test Title');
    authorControl.setValue('Test Author');
    publicationDateControl.setValue('2030');

    expect(component.getErrorMessage('publicationDate')).toBe('Published year must not be a future year');
  });
});
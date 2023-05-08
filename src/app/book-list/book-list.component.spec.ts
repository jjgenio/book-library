import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './book.model';
import { MatListModule } from '@angular/material/list';

import { BookListComponent } from './book-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({ selector: 'app-book', template: '' })
class MockBookComponent {
  @Input()
  book!: Book;
  @Output() remove = new EventEmitter<string>();
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent, MockBookComponent],
      imports: [MatListModule, FontAwesomeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of books', () => {
    const book: Book = {
      title: 'Book 1',
      author: 'Author 1',
      publicationDate: '1880',
    };
    component.books = [book];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain(book.title);
  });

  it('should emit a remove event when removeBook is called', () => {
    const spy = jest.spyOn(component.remove, 'emit');
    const title = 'Book 1';
    component.removeBook(title);
    expect(spy).toHaveBeenCalledWith(title);
  });
});

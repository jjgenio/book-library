import { Component } from '@angular/core';
import { selectBooks } from './state/books.selectors';
import { Store } from '@ngrx/store';
import { BooksActions } from './state/books.actions';
import { Book } from './book-list/book.model';
import { BooksService } from './book-list/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  books$ = this.store.select(selectBooks);

  onAdd(book: Book) {
    this.store.dispatch(BooksActions.addBook({ book }));
  }
 
  onRemove(title: string) {
    this.store.dispatch(BooksActions.removeBook({ title }));
  }
 
  constructor(private booksService: BooksService, private store: Store) {}

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksActions.retrievedBookList({ books }))
      );
  }
}

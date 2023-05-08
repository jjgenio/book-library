import { createReducer, on } from '@ngrx/store';
import { BooksActions } from './books.actions';
import { Book } from '../book-list/book.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksActions.removeBook, (state, { title }) =>
    state.filter(bookItem => bookItem.title !== title)
  ),
  on(BooksActions.addBook, (state, { book }) =>
    state.find(bookItem => bookItem.title === book.title)
      ? state
      : [...state, book]
  ),
  on(BooksActions.retrievedBookList, (_state, { books }) => books)
);

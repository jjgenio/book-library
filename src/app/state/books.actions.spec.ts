import { createAction, props } from '@ngrx/store';
import { Book } from '../book-list/book.model';
import { BooksActions } from './books.actions';

describe('BooksActions', () => {
  it('should create the Add Book action', () => {
    const book: Book = { title: 'Book 1', author: 'Author 1', publicationDate: '1880' };
    const expectedAction = createAction(
      '[Books] Add Book',
      props<{ book: Book }>()
    )({ book });
    const resultAction = BooksActions.addBook({ book });
    expect(resultAction).toEqual(expectedAction);
  });

  it('should create the Remove Book action', () => {
    const title = 'Book 1';
    const expectedAction = createAction(
      '[Books] Remove Book',
      props<{ title: string }>()
    )({ title });
    const resultAction = BooksActions.removeBook({ title });
    expect(resultAction).toEqual(expectedAction);
  });

  it('should create the Retrieved Book List action', () => {
    const books: ReadonlyArray<Book> = [
      { title: 'Book 1', author: 'Author 1', publicationDate: '1880' },
      { title: 'Book 2', author: 'Author 2', publicationDate: '1995' },
      { title: 'Book 3', author: 'Author 3', publicationDate: '2010' },
    ];
    const expectedAction = createAction(
      '[Books] Retrieved Book List',
      props<{ books: ReadonlyArray<Book> }>()
    )({ books });
    const resultAction = BooksActions.retrievedBookList({ books });
    expect(resultAction).toEqual(expectedAction);
  });
});
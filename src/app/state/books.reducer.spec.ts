import { BooksActions } from './books.actions';
import { Book } from '../book-list/book.model';
import { booksReducer } from './books.reducer';

describe('booksReducer', () => {
  const initialState: ReadonlyArray<Book> = [];

  const book1: Book = {
    title: 'Book 1',
    author: 'Author 1',
    publicationDate: '1880',
  };
  const book2: Book = {
    title: 'Book 2',
    author: 'Author 2',
    publicationDate: '1995',
  };
  const book3: Book = {
    title: 'Book 3',
    author: 'Author 3',
    publicationDate: '2010',
  };

  it('should return the default state', () => {
    const action = { type: 'Unknown' } as any;
    const state = booksReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle the removeBook action', () => {
    const state: ReadonlyArray<Book> = [book1, book2, book3];
    const action = BooksActions.removeBook({ title: 'Book 2' });
    const newState = booksReducer(state, action);
    expect(newState).toEqual([book1, book3]);
  });

  it('should handle the addBook action', () => {
    const state: ReadonlyArray<Book> = [book1, book3];
    const action = BooksActions.addBook({ book: book2 });
    const newState = booksReducer(state, action);
    expect(newState).toEqual([book1, book3, book2]);

    const existingAction = BooksActions.addBook({ book: book1 });
    const sameState = booksReducer(newState, existingAction);
    expect(sameState).toEqual(newState);
  });

  it('should handle the retrievedBookList action', () => {
    const action = BooksActions.retrievedBookList({ books: [book1, book2] });
    const newState = booksReducer(undefined, action);
    expect(newState).toEqual([book1, book2]);
  });
});

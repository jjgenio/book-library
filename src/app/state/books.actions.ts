import { createActionGroup, props } from '@ngrx/store';
import { Book } from '../book-list/book.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add Book': props<{ book: Book }>(),
    'Remove Book': props<{ title: string }>(),
    'Retrieved Book List': props<{ books: ReadonlyArray<Book> }>(),
  },
});

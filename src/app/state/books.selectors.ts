import { createFeatureSelector } from '@ngrx/store';
import { Book } from '../book-list/book.model';

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');

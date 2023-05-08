import { createFeatureSelector } from '@ngrx/store';
import { Book } from '../book-list/book.model';

describe('selectBooks', () => {
  it('should create the feature selector', () => {
    const state = { books: [{ title: 'Book 1', author: 'Author 1', publicationDate: '1880' }] };
    const featureSelector = createFeatureSelector<ReadonlyArray<Book>>('books');
    const selectedState = featureSelector(state);
    expect(selectedState).toEqual(state.books);
  });
});
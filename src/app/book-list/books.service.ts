import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../book-list/book.model';
 
@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private http: HttpClient) {}
 
  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{ items: Book[] }>(
        'assets/books.json'
      )
      .pipe(map((books) => books.items || []));
  }
}
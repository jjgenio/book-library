import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../book-list/book.model';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return an Observable of an empty array if the request fails', () => {
      const url = 'assets/books.json';
      const errorMessage = 'Request failed';
      service.getBooks().subscribe(books => {
        expect(books).toEqual([]);
      });
      const req = httpMock.expectOne(url);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

    it('should return an Observable of an array of books if the request succeeds', () => {
      const url = 'assets/books.json';
      const mockBooks: Book[] = [
        { title: 'Book 1', author: 'Author 1', publicationDate: '1880' },
        { title: 'Book 2', author: 'Author 2', publicationDate: '1995' },
        { title: 'Book 3', author: 'Author 3', publicationDate: '2010' },
      ];
      service.getBooks().subscribe(books => {
        expect(books).toEqual(mockBooks);
      });
      const req = httpMock.expectOne(url);
      req.flush({ items: mockBooks });
    });
  });
});

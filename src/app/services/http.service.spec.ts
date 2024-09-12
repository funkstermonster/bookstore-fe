import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { Book } from '../models/book';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8000/api/books';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBooks', () => {
    it('should return an array of books', () => {
      const dummyBooks: Book[] = [
        { id: '1', author: 'J.K. Rowling', title: 'Harry Potter', publish_date: '1997-06-26', isbn: '978-0747532743', summary: 'A young wizard\'s journey.', price: 19.99, on_store: 10 },
        { id: '2', author: 'J.R.R. Tolkien', title: 'The Hobbit', publish_date: '1937-09-21', isbn: '978-0261102217', summary: 'A hobbit\'s adventure.', price: 15.99, on_store: 5 }
      ];

      service.getBooks().subscribe(books => {
        expect(books.length).toBe(2);
        expect(books).toEqual(dummyBooks);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBooks);
    });
  });

  describe('#getBook', () => {
    it('should return a single book by ID', () => {
      const dummyBook: Book = { id: '1', author: 'J.K. Rowling', title: 'Harry Potter', publish_date: '1997-06-26', isbn: '978-0747532743', summary: 'A young wizard\'s journey.', price: 19.99, on_store: 10 };

      service.getBook('1').subscribe(book => {
        expect(book).toEqual(dummyBook);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBook);
    });
  });

  describe('#addBook', () => {
    it('should add a new book and return it', () => {
      const newBook: Book = { id: '3', author: 'George R.R. Martin', title: 'A Game of Thrones', publish_date: '1996-08-06', isbn: '978-0553103540', summary: 'A fantasy epic.', price: 25.99, on_store: 8 };

      service.addBook(newBook).subscribe(book => {
        expect(book).toEqual(newBook);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(newBook);
    });
  });

  describe('#updateBook', () => {
    it('should update a book and return the updated book', () => {
      const updatedBook: Book = { id: '1', author: 'J.K. Rowling', title: 'Harry Potter and the Chamber of Secrets', publish_date: '1998-07-02', isbn: '978-0747538482', summary: 'The second book in the Harry Potter series.', price: 20.99, on_store: 12 };

      service.updateBook('1', updatedBook).subscribe(book => {
        expect(book).toEqual(updatedBook);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedBook);
    });
  });

  describe('#deleteBook', () => {
    it('should delete a book by ID', () => {
      service.deleteBook('1').subscribe(response => {
        expect(response).toBeNull();
      });
    
      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});

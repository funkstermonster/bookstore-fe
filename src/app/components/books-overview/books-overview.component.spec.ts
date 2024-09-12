import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BooksOverviewComponent } from './books-overview.component';
import { BooksTableComponent } from '../books-table/books-table.component';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BooksOverviewComponent', () => {
  let component: BooksOverviewComponent;
  let fixture: ComponentFixture<BooksOverviewComponent>;
  let httpService: jasmine.SpyObj<HttpService>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getBooks', 'deleteBook']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock observables for the service methods
    httpSpy.getBooks.and.returnValue(of([]));
    httpSpy.deleteBook.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BooksOverviewComponent,
        BooksTableComponent,
        MatDialogModule,
        MatButtonModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksOverviewComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', () => {
    const mockBooks: Book[] = [
      { id: '1', author: 'Author 1', title: 'Title 1', publish_date: '2023-01-01', isbn: '1234567890', summary: 'Summary 1', price: 19.99, on_store: 10 },
      { id: '2', author: 'Author 2', title: 'Title 2', publish_date: '2023-02-01', isbn: '0987654321', summary: 'Summary 2', price: 29.99, on_store: 5 }
    ];

    httpService.getBooks.and.returnValue(of(mockBooks));

    component.ngOnInit();
    fixture.detectChanges();

    component.books$.subscribe(books => {
      expect(books).toEqual(mockBooks);
    });
  });

  it('should handle error when loading books', () => {
    httpService.getBooks.and.returnValue(throwError(() => new Error('Error loading books')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(toastr.error).toHaveBeenCalledWith('Error loading books!');
  });

  it('should delete a book and reload books on success', () => {
    const mockBook: Book = { id: '1', author: 'Author 1', title: 'Title 1', publish_date: '2023-01-01', isbn: '1234567890', summary: 'Summary 1', price: 19.99, on_store: 10 };

    httpService.deleteBook.and.returnValue(of(void 0));
    httpService.getBooks.and.returnValue(of([]));

    component.onDelete(mockBook);

    // Use `fixture.whenStable()` to wait for async operations
    fixture.whenStable().then(() => {
      expect(httpService.deleteBook).toHaveBeenCalledWith(mockBook.id);
      expect(toastr.success).toHaveBeenCalledWith('Book deleted successfully!');
      expect(httpService.getBooks).toHaveBeenCalled();
    });
  });

  it('should handle error when deleting a book', () => {
    const mockBook: Book = { id: '1', author: 'Author 1', title: 'Title 1', publish_date: '2023-01-01', isbn: '1234567890', summary: 'Summary 1', price: 19.99, on_store: 10 };

    httpService.deleteBook.and.returnValue(throwError(() => new Error('Error deleting book')));

    component.onDelete(mockBook);

    // Use `fixture.whenStable()` to wait for async operations
    fixture.whenStable().then(() => {
      expect(httpService.deleteBook).toHaveBeenCalledWith(mockBook.id);
      expect(toastr.error).toHaveBeenCalledWith('Error deleting book!');
    });
  });

  it('should navigate to book details page', () => {
    const mockBook: Book = { id: '1', author: 'Author 1', title: 'Title 1', publish_date: '2023-01-01', isbn: '1234567890', summary: 'Summary 1', price: 19.99, on_store: 10 };

    component.navigateBookDetailPage(mockBook);

    expect(router.navigate).toHaveBeenCalledWith(['/book-details', mockBook.id]);
  });

  it('should navigate to create book page', () => {
    component.navigateToCreateBookPage();

    expect(router.navigate).toHaveBeenCalledWith(['/create-book']);
  });
});

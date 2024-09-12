import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { BookCreateComponent } from './book-create.component';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BooksOverviewComponent } from '../books-overview/books-overview.component';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let httpService: jasmine.SpyObj<HttpService>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['addBook']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule.withRoutes([ { path: 'books', component: BooksOverviewComponent }]),
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.bookForm;
    expect(form).toBeDefined();
    expect(form.get('author')?.value).toBe('');
    expect(form.get('title')?.value).toBe('');
    expect(form.get('publish_date')?.value).toBe('');
    expect(form.get('isbn')?.value).toBe('');
    expect(form.get('summary')?.value).toBe('');
    expect(form.get('price')?.value).toBe(0);
    expect(form.get('on_store')?.value).toBe(0);
  });

  it('should not submit the form if it is invalid', () => {
    component.bookForm.setValue({
      author: '',
      title: '',
      publish_date: '',
      isbn: '',
      summary: '',
      price: 0,
      on_store: 0
    });
    component.onSubmit();
    expect(httpService.addBook).not.toHaveBeenCalled();
  });

  it('should call addBook when form is valid', () => {
    const mockBook: any = {
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: '1997-06-26T00:00:00.000Z',
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    };

    httpService.addBook.and.returnValue(of(mockBook));

    component.bookForm.setValue({
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: '1997-06-26T00:00:00.000Z',
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });

    component.onSubmit();

    expect(httpService.addBook).toHaveBeenCalledWith(mockBook);
    expect(toastr.success).toHaveBeenCalledWith('Book added successfully');
  });

  it('should show an error message when addBook fails', () => {
    // Mock the addBook method to return an error
    httpService.addBook.and.returnValue(
      throwError(() => new Error('Failed to add book'))
    );

    // Set the form with valid data
    component.bookForm.setValue({
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: '1997-06-26',
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });

    // Trigger the form submission
    component.onSubmit();

    // Expect the error toastr to be called
    expect(toastr.error).toHaveBeenCalledWith('Failed to add book');
  });
});

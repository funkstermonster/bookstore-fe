import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, BehaviorSubject, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { BookDetailsComponent } from './book-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Book } from 'src/app/models/book';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let httpService: HttpService;
  let toastr: ToastrService;
  let mockBookSubject: BehaviorSubject<Book>;

  beforeEach(async () => {
    mockBookSubject = new BehaviorSubject<Book>({
      id: '1', 
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: new Date('1997-06-26').toISOString(),
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule,
        CommonModule,
        BookDetailsComponent,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: HttpService, useValue: { getBook: () => mockBookSubject.asObservable(), updateBook: () => of({}) } },
        { provide: ToastrService, useValue: { success: () => {}, error: () => {} } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct values', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.bookForm.value).toEqual({
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: new Date('1997-06-26').toISOString(),
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });
  });

  it('should toggle edit mode', () => {
    component.toggleEditMode(true);
    expect(component.isEditMode).toBeTrue();

    component.toggleEditMode(false);
    expect(component.isEditMode).toBeFalse();
  });

  it('should call updateBook on form submission', () => {
    const mockBook: any = {
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: new Date('1997-06-26').toISOString(), // Use ISO string format
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    };
  
    // Set up the form with valid data in the same format
    component.bookForm.setValue({
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: new Date('1997-06-26').toISOString(), // Use ISO string format
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });
  
    spyOn(httpService, 'updateBook').and.returnValue(of(mockBook));
    spyOn(toastr, 'success');
  
    component.onSubmit();
  
    expect(httpService.updateBook).toHaveBeenCalledWith(component.bookId, mockBook);
    expect(toastr.success).toHaveBeenCalledWith('Book updated successfully!');
  });
  

  it('should handle updateBook error', () => {
  
    // Set up the form with valid data
    component.bookForm.setValue({
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publish_date: new Date('1997-06-26').toISOString(), // Use ISO string format
      isbn: '978-0747532743',
      summary: 'A young wizard\'s journey.',
      price: 19.99,
      on_store: 10
    });
  
    spyOn(httpService, 'updateBook').and.returnValue(throwError('Failed to update book!'));
    spyOn(toastr, 'error');
  
    component.onSubmit();
  
    expect(toastr.error).toHaveBeenCalledWith('Failed to update book!');
  });
  
});

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book } from 'src/app/models/book';
import { MatInputModule } from '@angular/material/input';
import { Observable, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string = '';
  isEditMode: boolean = true;
  book$: Observable<Book> = new Observable<Book>();

  private fb = inject(FormBuilder);
  private httpService = inject(HttpService);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  constructor() {
    this.bookForm = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      publish_date: ['', Validators.required],
      isbn: ['', Validators.required],
      summary: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      on_store: [0, Validators.required],
    });
  }
  ngOnInit(): void {
    this.initializeBookDetails();
  }

  get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  get title(): FormControl {
    return this.bookForm.get('title')  as FormControl;
  }

  get publish_date(): FormControl {
    return this.bookForm.get('publish_date')  as FormControl;
  }

  get isbn(): FormControl {
    return this.bookForm.get('isbn')  as FormControl;
  }

  get summary(): FormControl {
    return this.bookForm.get('summary')  as FormControl;
  }

  get price(): FormControl {
    return this.bookForm.get('price')  as FormControl;
  }

  get on_store(): FormControl {
    return this.bookForm.get('on_store')  as FormControl;
  }

  public populateForm(book: Book) {
    this.bookForm.patchValue({
      author: book.author,
      title: book.title,
      publish_date: book.publish_date,
      isbn: book.isbn,
      summary: book.summary,
      price: book.price,
      on_store: book.on_store,
    });
  }

  private initializeBookDetails(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.bookId = params.get('id')!;
        console.log(this.bookId);
        return this.httpService.getBook(this.bookId);
      })
    );

    this.book$.subscribe({
      next: (book: Book) => {
        console.log(book);
        if (book) {
          this.populateForm(book);
        }
        this.isEditMode = false;
      },
      error: () => {
        this.toastr.error('Failed to load book details!');
      },
    });
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    this.httpService.updateBook(this.bookId, this.bookForm.value).subscribe({
      next: () => {
        this.toastr.success('Book updated successfully!');
        this.toggleEditMode(false);
      },
      error: () => this.toastr.error('Failed to update book!'),
    });
  }

  public toggleEditMode(edit: boolean): void {
    this.isEditMode = edit;
    if (!edit) {
      this.initializeBookDetails();
    }
  }
}

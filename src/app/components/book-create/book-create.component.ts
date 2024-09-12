import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-create',
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
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent {
  bookForm: FormGroup;

  private fb = inject(FormBuilder);
  private httpService = inject(HttpService);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private router = inject(Router);

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

  get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  get title(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }

  get publish_date(): FormControl {
    return this.bookForm.get('publish_date') as FormControl;
  }

  get isbn(): FormControl {
    return this.bookForm.get('isbn') as FormControl;
  }

  get summary(): FormControl {
    return this.bookForm.get('summary') as FormControl;
  }

  get price(): FormControl {
    return this.bookForm.get('price') as FormControl;
  }

  get on_store(): FormControl {
    return this.bookForm.get('on_store') as FormControl;
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const newBook: Book = this.bookForm.value;

    this.addBook(newBook).subscribe({
      next: () => {
        this.toastr.success('Book added successfully');
        this.router.navigate(['/books']);
      },
      error: () => this.toastr.error('Failed to add book'),
    });
  }

  public addBook(book: Book): Observable<Book> {
    return this.httpService.addBook(book);
  }
}

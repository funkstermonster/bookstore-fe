import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { HttpService } from 'src/app/services/http.service';
import { BooksTableComponent } from '../books-table/books-table.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-books-overview',
  standalone: true,
  imports: [CommonModule, BooksTableComponent, MatDialogModule],
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent implements OnInit {
  private httpService = inject(HttpService);
  private toastr = inject(ToastrService);

  books$: Observable<Book[]> = new Observable<Book[]>();

  ngOnInit(): void {
    this.loadBooks();
  }

  bookColumns = [
    { columnDef: 'id', header: 'ID', cell: (element: Book) => `${element.id}` },
    {
      columnDef: 'author',
      header: 'Author',
      cell: (element: Book) => `${element.author}`,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: Book) => `${element.title}`,
    },
    {
      columnDef: 'publish_date',
      header: 'Publish Date',
      cell: (element: Book) =>
        `${new Date(element.publish_date).toLocaleDateString()}`,
    },
    {
      columnDef: 'isbn',
      header: 'ISBN',
      cell: (element: Book) => `${element.isbn}`,
    },
    {
      columnDef: 'summary',
      header: 'Summary',
      cell: (element: Book) => `${element.summary?.slice(0, 30)}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: Book) => `${element.price}`,
    },
    {
      columnDef: 'on_store',
      header: 'On Store',
      cell: (element: Book) => `${element.on_store}`,
    },
  ];

  deleteDialogConfig: MatDialogConfig = {
    width: '300px',
    data: {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete this item? This action cannot be undone.',
    },
  };

  onDelete(book: Book) {
    this.httpService
      .deleteBook(book.id)
      .pipe(
        tap(() => {
          this.toastr.success('Book deleted successfully!');
          this.loadBooks();
        }),
        catchError(() => {
          this.toastr.error('Error deleting book!');
          return of([]);
        })
      )
      .subscribe();
  }

  private loadBooks() {
    this.books$ = this.httpService.getBooks().pipe(
      catchError(() => {
        this.toastr.error('Error loading books!');
        return of([]);
      })
    );
  }
}

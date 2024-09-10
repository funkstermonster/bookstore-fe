import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { HttpService } from 'src/app/services/http.service';
import { BooksTableComponent } from '../books-table/books-table.component';

@Component({
  selector: 'app-books-overview',
  standalone: true,
  imports: [CommonModule, BooksTableComponent],
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss']
})
export class BooksOverviewComponent implements OnInit {
  books$: Observable<Book[]> = new Observable<Book[]>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.books$ = this.httpService.getBooks();
  }

  bookColumns = [
    { columnDef: 'id', header: 'ID', cell: (element: Book) => `${element.id}` },
    { columnDef: 'author', header: 'Author', cell: (element: Book) => `${element.author}` },
    { columnDef: 'title', header: 'Title', cell: (element: Book) => `${element.title}` },
    { columnDef: 'publish_date', header: 'Publish Date', cell: (element: Book) => `${new Date(element.publish_date).toLocaleDateString()}` },
    { columnDef: 'isbn', header: 'ISBN', cell: (element: Book) => `${element.isbn}` },
    { columnDef: 'summary', header: 'Summary', cell: (element: Book) => `${element.summary?.slice(0, 30)}` },
    { columnDef: 'price', header: 'Price', cell: (element: Book) => `${element.price}` },
    { columnDef: 'on_store', header: 'On Store', cell: (element: Book) => `${element.on_store}` },
    { columnDef: 'actions', header: 'Action Items', cell: () => '' }

  ];
}

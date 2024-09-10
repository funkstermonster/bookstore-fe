import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveDirective } from 'src/app/directives/mat-table-responsive.directive';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ColumnDefinition } from 'src/app/models/columnDefinition';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    MatSortModule,
    MatTableResponsiveDirective,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columnDefinitions: ColumnDefinition[] = [];
  @Output() delete = new EventEmitter<any>(); 

  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  get displayedColumns(): string[] {
    return [...this.columnDefinitions.map(cd => cd.columnDef), 'actionItems'];
  }
  
  onEdit(element: any) {
    console.log('Edit clicked', element);
  }

  onDelete(element: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { title: 'Confirm Deletion', text: 'Are you sure to delete this book? This action is irrevelsible!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(element);
      }
    });
  }
}

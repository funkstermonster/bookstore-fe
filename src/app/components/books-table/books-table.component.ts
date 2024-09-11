import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveDirective } from 'src/app/directives/mat-table-responsive.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ColumnDefinition } from 'src/app/models/columnDefinition';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogData } from 'src/app/models/confirmDialogData';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableResponsiveDirective,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent implements OnInit {
  private dialog = inject(MatDialog);


  @Input() data: any[] = [];
  @Input() columnDefinitions: ColumnDefinition[] = [];
  @Input() deleteDialogConfig: MatDialogConfig<ConfirmDialogData> =
    new MatDialogConfig<ConfirmDialogData>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get displayedColumns(): string[] {
    return [...this.columnDefinitions.map((cd) => cd.columnDef), 'actionItems'];
  }

  onEdit(element: any) {
    this.edit.emit(element);
  }

  public onDelete(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      ...this.deleteDialogConfig,
      data: {
        title: this.deleteDialogConfig.data?.title,
        message: this.deleteDialogConfig.data?.message,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(element);
      }
    });
  }
}

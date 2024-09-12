import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksTableComponent } from './books-table.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableResponsiveDirective } from 'src/app/directives/mat-table-responsive.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogConfig } from '@angular/material/dialog';

describe('BooksTableComponent', () => {
  let component: BooksTableComponent;
  let fixture: ComponentFixture<BooksTableComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        BooksTableComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableResponsiveDirective,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksTableComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation dialog on delete', () => {
    const mockData = { id: 1, name: 'Test Book' };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));

    dialog.open.and.returnValue(dialogRefSpy);

    // Ensure deleteDialogConfig includes only title and message
    component.deleteDialogConfig = {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure?',
      },
    } as MatDialogConfig;

    component.onDelete(mockData);

    expect(dialog.open).toHaveBeenCalledWith(
      ConfirmationDialogComponent,
      jasmine.objectContaining({
        data: jasmine.objectContaining({
          title: 'Confirm Delete',
          message: 'Are you sure?',
        }),
      })
    );

    component.delete.subscribe((deletedItem) => {
      expect(deletedItem).toEqual(mockData);
    });
  });
});

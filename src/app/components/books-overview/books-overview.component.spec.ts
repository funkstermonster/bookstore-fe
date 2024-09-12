import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOverviewComponent } from './books-overview.component';
import { CommonModule } from '@angular/common';
import { BooksTableComponent } from '../books-table/books-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('BooksOverviewComponent', () => {
  let component: BooksOverviewComponent;
  let fixture: ComponentFixture<BooksOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksOverviewComponent,
        CommonModule,
        BooksTableComponent,
        MatDialogModule,
        MatButtonModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(BooksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

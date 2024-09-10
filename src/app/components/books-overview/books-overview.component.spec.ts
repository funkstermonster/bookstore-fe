import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOverviewComponent } from './books-overview.component';

describe('BooksOverviewComponent', () => {
  let component: BooksOverviewComponent;
  let fixture: ComponentFixture<BooksOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BooksOverviewComponent]
    });
    fixture = TestBed.createComponent(BooksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

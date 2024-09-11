import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';
import { HomeComponent } from './components/home/home.component';
import { provideToastr } from 'ngx-toastr';
import { BookDetailsComponent } from './components/book-details/book-details.component';

export const router: Routes = [
  { path: "home", component: HomeComponent },
  { path: "books", component: BooksOverviewComponent },
  { path: "book-details", component: BookDetailsComponent },
  { path: "**", redirectTo: "home", pathMatch: 'full' }
];
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(router), provideAnimations(), provideHttpClient(), provideToastr()],
};

# BookStore Frontend

## Overview

This is a standalone Angular 16 application for managing a bookstore. The application supports CRUD operations for books and uses Angular Material for UI components. It includes features for adding, viewing, editing, and deleting books.

## Run
To install the dependencies that this application uses please run this command:  
`npm install`

After that run the application with this command:  
`ng serve`

## Features

- **Book Management**: Create, view, update, and delete books.
- **Book List**: Display books in a responsive Angular Material table with pagination.
- **Book Details**: View and edit book details using reactive forms.
- **Reusable Components**: Modular and reusable components for various functionalities.
- **Confirmation Dialog**: Reusable dialog component for confirmation.

## Components

### `BookCreateComponent`

- **Purpose**: Add a new book.

### `BookDetailsComponent`

- **Purpose**: View and edit book details.


### `BooksOverviewComponent`

- **Purpose**: Display a list of books in a table.


### `BooksTableComponent`

- **Purpose**: A reusable table component for displaying books with actions.


### `ConfirmationDialogComponent`

- **Purpose**: Reusable confirmation dialog for delete actions.

### `HomeComponent`

- **Purpose**: This is an entry point for the application.

### `HeaderComponent`

- **Purpose**: This is the header with two menu entires: Home and Books. 'Home' navigates to the welcome page and 'Books' navigates to the book's overview page.

### `FooterComponent`

- **Purpose**: This is a footer with placeholders, like: Privacy Policy, Terms of Service, Contact Us.


## Services

### `HttpService`

- **Purpose**: Handle HTTP requests related to books.
- **Path**: `src/app/services/http.service.ts`
- **Methods**:
  - `getBooks()`: Fetch all books.
  - `getBook(id: string)`: Fetch a book by ID.
  - `addBook(book: Book)`: Add a new book.
  - `updateBook(id: string, book: Book)`: Update an existing book.
  - `deleteBook(id: string)`: Delete a book.

## Models

### `Book`

- **Description**: Represents a book entity.
- **Path**: `src/app/models/book.model.ts`
- **Fields**:
  - `id`: Unique identifier.
  - `author`: Author of the book.
  - `title`: Title of the book.
  - `publish_date`: Publication date.
  - `isbn`: ISBN number.
  - `summary`: Summary of the book.
  - `price`: Price.
  - `on_store`: Stock availability.
  - `created_at` (optional): Creation timestamp.
  - `updated_at` (optional): Last update timestamp.

### `ColumnDefinition`

- **Description**: Defines the structure of table columns.
- **Path**: `src/app/models/column-definition.model.ts`
- **Fields**:
  - `columnDef`: Column definition name.
  - `header`: Header text.
  - `cell`: Function to get the cell value.

### `ConfirmDialogData`

- **Description**: Data used in confirmation dialogs.
- **Path**: `src/app/models/confirm-dialog-data.model.ts`
- **Fields**:
  - `title`: Dialog title.
  - `message`: Dialog message.
  - `confirmText`: Text for the confirm button.
  - `cancelText`: Text for the cancel button.

## Directives

### `MatTableResponsiveDirective`

- **Purpose**: Makes Material tables responsive.
- **Path**: `src/app/directives/mat-table-responsive.directive.ts`

### Routes Configuration

- **Path**: `src/app.config.ts`
- **Routes**:
  - `home`: Displays the home page.
  - `books`: Displays the list of books.
  - `book-details/:id`: Displays details of a specific book.
  - `create-book`: Allows creation of a new book.
  - `**`: Redirects to the home page for unknown routes.

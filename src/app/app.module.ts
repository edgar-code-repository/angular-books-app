import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';

import { BooksService } from './services/books.service';
import { CategoriesService } from './services/categories.service';
import { AuthorsService } from './services/authors.service';
import { SortBooksByNamePipe } from './pipes/sort-books-by-name.pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { FormExampleComponent } from './form-example/form-example.component';
import { UploadExampleComponent } from './upload-example/upload-example.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    CreateBookComponent,
    EditBookComponent,
    PageNotFoundComponent,
    CategoriesListComponent,
    AuthorsListComponent,
    SortBooksByNamePipe,
    FilterByCategoryPipe,
    FormExampleComponent,
    UploadExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BooksService,
    CategoriesService,
    AuthorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

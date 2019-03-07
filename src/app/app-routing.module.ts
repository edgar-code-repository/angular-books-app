import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent} from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FormExampleComponent } from './form-example/form-example.component';
import { UploadExampleComponent } from './upload-example/upload-example.component'

const routes: Routes = [
  { path:"", redirectTo:"/booksList", pathMatch:"full" },
  { path:"booksList", component:BooksListComponent },
  { path:"createBook", component:CreateBookComponent },
  { path:"editBook/:bookId", component:EditBookComponent },
  { path:"authorsList", component:AuthorsListComponent },
  { path:"createAuthor", component:CreateAuthorComponent },
  { path:"editAuthor/:authorId", component:EditAuthorComponent },
  { path:"categoriesList", component:CategoriesListComponent },
  { path:"createCategory", component:CreateCategoryComponent },
  { path:"editCategory/:categoryId", component:EditCategoryComponent },
  { path:"formExample", component:FormExampleComponent }, 
  { path:"uploadExample", component:UploadExampleComponent },
  { path:"**", component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

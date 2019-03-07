import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BooksService } from '../services/books.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  flagBooks: boolean = false;
  booksList: Book[];
  categoriesList: Category[];
  categorySelected: any;
  errorMesage: string;
  booleanError: boolean = false;
  message: string;

  constructor(private booksService: BooksService, private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.message = "";
    this.errorMesage = "";

    this.loadBooks();
    this.loadCategories();

  }

  loadCategories() {
    let observableCategories = this.categoriesService.getCategories();
    observableCategories.subscribe(
      (data) => this.categoriesList = data,
      (error) => {
        this.errorMesage = "An error ocurred while calling categoriesService (" + error + ").";
        this.booleanError = true;
      }      
    );    
  }

  
  loadBooks() {
    let observableBooks = this.booksService.getBooks();
    observableBooks.subscribe(
      (data) => {
        this.booksList = data;
        
        if (this.booksList.length > 0) {
            this.flagBooks = true;
            this.message = "";
        }
        else {
          this.flagBooks = false;
          this.message = "No books available.";
        }
      },
      (error) => {
        console.log("Error:" + error)
        this.errorMesage = "An error ocurred while calling booksService (" + error + ").";
        this.booleanError = true;
      }
    );    
  }

  deleteBook(book: Book) {
      console.log("deleteBook - book id:" + book.bookId);
      console.log("deleteBook - book:" + book.name);

      if (confirm("¿Are you sure you want to delete this book?")) {

        let observableDelete = this.booksService.deleteBook(book);
        observableDelete.subscribe(
          (data: any) => {
            console.log("Successfull call to booksService.deleteBook(book)");
            this.loadBooks();
          },
          (error) => {
            console.log("Error status:" + error.status);
            console.log("Error message:" + error.message);
            this.errorMesage = "An error ocurred while calling booksService (" + error.status + " - " + error.message + ").";
            this.booleanError = true;
          }
        );

      }

  }

  editBook(book: Book) {
      console.log("[BooksListComponent][editBook] - book id:" + book.bookId);
      console.log("[BooksListComponent][editBook] - book name:" + book.name);

      this.goToRoute("editBook" + "/" + book.bookId);

  }


  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }

}

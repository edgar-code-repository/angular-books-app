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

  booksList: Book[];
  categoriesList: Category[];
  categorySelected: any;

  constructor(private booksService: BooksService, private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {
    let observableBooks = this.booksService.getBooks();
    observableBooks.subscribe(
      (data) => this.booksList = data,
      (error) => console.log("Error:" + error)
    );

    let observableCategories = this.categoriesService.getCategories();
    observableCategories.subscribe(
      (data) => this.categoriesList = data,
      (error) => console.log("Error:" + error)      
    );    
  }

  goToRoute(strRouteParam) {
    this.router.navigateByUrl(strRouteParam);
  }

}

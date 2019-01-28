import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { Author } from '../model/author';
import { CategoriesService } from '../services/categories.service';
import { AuthorsService } from '../services/authors.service';
import { BooksService} from '../services/books.service';
import { UploadServiceService } from '../services/upload-service.service';
import { Book } from '../model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  flagContinueSaveBook: boolean = false;
  categoriesList: Category[];
  authorsList: Author[];
  newBookForm: FormGroup;
  selectedAuthorsList: Author[] = [];
  selectedFile: File;

  constructor(private categoriesService: CategoriesService, 
              private authorsService: AuthorsService, 
              private booksService: BooksService, 
              private formBuilder: FormBuilder,
              private uploadService: UploadServiceService,
              private router: Router) { }

  ngOnInit() {
    let observableCategories = this.categoriesService.getCategories();
    observableCategories.subscribe(
      (data) => this.categoriesList = data,
      (error) => console.log("[CreateBookComponent][ngOnInit] Error when calling to categoriesService.getCategories():" + error)      
    );

    let observableAuthors = this.authorsService.getAuthors();
    observableAuthors.subscribe(
      (data) => this.authorsList = data,
      (error) => console.log("[CreateBookComponent][ngOnInit] Error when calling to authorsService.getAuthors():" + error)
    );    

    this.newBookForm = this.formBuilder.group({
      bookName: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      bookIsbn: [null, Validators.required],
      bookDescription: [null,Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)])],
      bookCategory: '',
      bookImage: '',
      bookAuthor: ''
    })    
  }

  continueAddBook() {
    this.flagContinueSaveBook = true;
  }

  backAddBook() {
    this.flagContinueSaveBook = false;
  }

  addSelectedAuthor() {
    //console.log("[CreateBookComponent][addSelectedAuthor] author selected: " + this.newBookForm.controls.bookAuthor.value);

    if (this.newBookForm.controls.bookAuthor.value == -1) {
      alert("An author must be selected");
      return;
    }

    var authorIdSelected = this.newBookForm.controls.bookAuthor.value;
    var selectedAuthorsList = this.selectedAuthorsList;
    const checkRoleExistence = authorIdParam => this.selectedAuthorsList.some( ({authorId}) => authorId == authorIdParam);

    this.authorsList.forEach(function (author) {
      //console.log("[CreateBookComponent][addSelectedAuthor] authors list forEach: " + author.authorId);
      //console.log("[CreateBookComponent][addSelectedAuthor] forEach - author selected: " + authorIdSelected);
      if ( (author.authorId == authorIdSelected) &&  (!checkRoleExistence(author.authorId)) )  {
        //console.log("[CreateBookComponent][addSelectedAuthor] element added to array ");
        selectedAuthorsList.push(author);
      }

    });

  }

  deleteSelectedAuthor(authorId) {
    //console.log("[CreateBookComponent][deleteSelectedAuthor] authorId: " + authorId);

    var selectedAuthorsList = this.selectedAuthorsList;
    selectedAuthorsList.forEach(function (author, index) {  
      if (authorId == author.authorId) {
        selectedAuthorsList.splice(index, 1);
        return;
      }
    });

  }

  onFileChanged(event) {
    console.log("[CreateBookComponent][onFileChanged][START]");

    this.selectedFile = event.target.files[0];

    console.log("[CreateBookComponent][onFileChanged] file name: " + this.selectedFile.name);
    console.log("[CreateBookComponent][onFileChanged][END]");
  }  

  newBookSubmit() {
    console.log("[CreateBookComponent][newBookSubmit] name: " + this.newBookForm.controls.bookName.value);
    console.log("[CreateBookComponent][newBookSubmit] isbn: " + this.newBookForm.controls.bookIsbn.value);
    console.log("[CreateBookComponent][newBookSubmit] description: " + this.newBookForm.controls.bookDescription.value);
    console.log("[CreateBookComponent][newBookSubmit] category id: " + this.newBookForm.controls.bookCategory.value);
    console.log("[CreateBookComponent][newBookSubmit] image: " + this.newBookForm.controls.bookImage.value);
    console.log("[CreateBookComponent][newBookSubmit] authors: " + this.selectedAuthorsList);

    var categorySelected;
    var categoriesList = this.categoriesList;
    var categoryIdSelected = this.newBookForm.controls.bookCategory.value;
    categoriesList.forEach(function (category) {  
      if (categoryIdSelected == category.categoryId) {
        categorySelected = category;
      }
    });    

    var newBook: Book = {
      bookId: 0,
      name: this.newBookForm.controls.bookName.value,
      isbn: this.newBookForm.controls.bookIsbn.value,
      category: categorySelected,
      description: this.newBookForm.controls.bookDescription.value,
      imageName: this.selectedFile.name,
      authors: this.selectedAuthorsList
    }

    this.uploadService.uploadImage(this.selectedFile).subscribe(
      (data) => {
        console.log("[CreateBookComponent][newBookSubmit] Successfull call to uploadService.uploadImage");
                
        this.saveBook(newBook);
        
      },
      (error) => {
        console.log("[CreateBookComponent][newBookSubmit] Error when calling to uploadService.uploadImage:" + error);
      }
    );    

  }

  saveBook(newBook) {
    console.log("[CreateBookComponent][saveBook][START]");

    let observableSaveBook = this.booksService.saveBook(newBook);
    observableSaveBook.subscribe(
      (data) => { 
        console.log("[CreateBookComponent][saveBook] Successfull call to booksService.saveBook");
        this.goToRoute("booksList");
      },
      (error) => console.log("[CreateBookComponent][saveBook] Error when calling to booksService.saveBook:" + error)
    );      
    
    console.log("[CreateBookComponent][saveBook][END]");
  }

  goToRoute(strRouteParam) {
    this.router.navigateByUrl(strRouteParam);
  }

}

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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

    flagContinueSaveBook: boolean = false;
    flagAddedAuthors: boolean = false;
    categoriesList: Category[];
    authorsList: Author[];
    editBookForm: FormGroup;
    selectedAuthorsList: Author[] = [];
    selectedFile: File;  
    bookIdSelected: Number;
    bookSelected: Book;
    imageName: String;

    constructor(private categoriesService: CategoriesService, 
      private authorsService: AuthorsService, 
      private booksService: BooksService, 
      private formBuilder: FormBuilder,
      private uploadService: UploadServiceService,
      private router: Router,
      private activatedroute:ActivatedRoute) { }

    ngOnInit() {

      this.bookIdSelected = this.activatedroute.snapshot.params['bookId'];
      console.log("[EditBookComponent][ngOnInit] bookIdSelected: " + this.bookIdSelected);

      this.flagAddedAuthors = false;

      this.editBookForm = this.formBuilder.group({
        bookName: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
        bookIsbn: [null, Validators.required],
        bookDescription: [null,Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(1000)])],
        bookCategory: [null, Validators.required],
        bookAuthor: [null]
      })       

      let observableBookById = this.booksService.getBookById(this.bookIdSelected);
      observableBookById.subscribe(
        (data) => {
          this.bookSelected = data;
          this.selectedAuthorsList = data.authors;
          this.flagAddedAuthors = true;
          this.imageName = data.imageName;

          this.editBookForm = this.formBuilder.group({
            bookName: [data.name, Validators.compose([Validators.required, Validators.minLength(10)])],
            bookIsbn: [data.isbn, Validators.required],
            bookDescription: [data.description,Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(2500)])],
            bookCategory: [data.category.categoryId, Validators.required],
            bookAuthor: [null]
          }) 

        },
        (error) => {
          console.log("[EditBookComponent][ngOnInit] Error when calling to booksService.getBookById():" + error.status);
          this.editBookForm = this.formBuilder.group({
            bookName: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
            bookIsbn: [null, Validators.required],
            bookDescription: [null,Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(1000)])],
            bookCategory: [null, Validators.required],
            bookAuthor: [null]
          });           
        }      
      );      

      let observableCategories = this.categoriesService.getCategories();
      observableCategories.subscribe(
        (data) => this.categoriesList = data,
        (error) => console.log("[EditBookComponent][ngOnInit] Error when calling to categoriesService.getCategories():" + error.status)      
      );
  
      let observableAuthors = this.authorsService.getAuthors();
      observableAuthors.subscribe(
        (data) => this.authorsList = data,
        (error) => console.log("[EditBookComponent][ngOnInit] Error when calling to authorsService.getAuthors():" + error.status)
      );
     
    }
    
    continueAddBook() {
      this.flagContinueSaveBook = true;
    }
  
    backAddBook() {
      this.flagContinueSaveBook = false;
    }

    addSelectedAuthor() {
      //console.log("[EditBookComponent][addSelectedAuthor] author selected: " + this.newBookForm.controls.bookAuthor.value);
  
      if (this.editBookForm.controls.bookAuthor.value == -1) {
        alert("An author must be selected");
        return;
      }
  
      //var hiddenAuthors = this.newBookForm.controls.hiddenAuthors.value;
      var authorIdSelected = this.editBookForm.controls.bookAuthor.value;
      var selectedAuthorsList = this.selectedAuthorsList;
      var flagAddedAuthors = this.flagAddedAuthors;
      const checkRoleExistence = authorIdParam => this.selectedAuthorsList.some( ({authorId}) => authorId == authorIdParam);
  
      this.authorsList.forEach(function (author) {
        //console.log("[CreateBookComponent][addSelectedAuthor] authors list forEach: " + author.authorId);
        //console.log("[CreateBookComponent][addSelectedAuthor] forEach - author selected: " + authorIdSelected);
        if ( (author.authorId == authorIdSelected) &&  (!checkRoleExistence(author.authorId)) )  {
          //console.log("[CreateBookComponent][addSelectedAuthor] element added to array ");
          selectedAuthorsList.push(author);
          flagAddedAuthors = true;
          //hiddenAuthors = hiddenAuthors + " | " + author.firstName + " " + author.lastName;
        }
        
      });
  
      //this.newBookForm.controls.hiddenAuthors.value = hiddenAuthors;
      this.flagAddedAuthors = flagAddedAuthors;
  
    }
    
    deleteSelectedAuthor(authorId) {
      //console.log("[CreateBookComponent][deleteSelectedAuthor] authorId: " + authorId);
  
      var search: boolean = false;
      var selectedAuthorsList = this.selectedAuthorsList;
      var flagAddedAuthors = this.flagAddedAuthors;
      //var hiddenAuthors = this.newBookForm.controls.hiddenAuthors.value;
  
      for (var index=0;index<selectedAuthorsList.length;index++) {
        var author = selectedAuthorsList[index];
        if (authorId == author.authorId) {
  
          if (selectedAuthorsList.length == 1) {
            flagAddedAuthors = false;
            //hiddenAuthors = "";
          }
  
          selectedAuthorsList.splice(index, 1);
          break;
          
        }      
      }
  
      this.flagAddedAuthors = flagAddedAuthors;

    }
    
    onFileChanged(event) {
      console.log("[EditBookComponent][onFileChanged][START]");
  
      this.selectedFile = event.target.files[0];
  
      console.log("[EditBookComponent][onFileChanged] file name: " + this.selectedFile.name);
      console.log("[EditBookComponent][onFileChanged][END]");
    }  
    
    editBookSubmit() {
      console.log("[EditBookComponent][editBookSubmit] name: " + this.editBookForm.controls.bookName.value);
      console.log("[EditBookComponent][editBookSubmit] isbn: " + this.editBookForm.controls.bookIsbn.value);
      console.log("[EditBookComponent][editBookSubmit] description: " + this.editBookForm.controls.bookDescription.value);
      console.log("[EditBookComponent][editBookSubmit] category id: " + this.editBookForm.controls.bookCategory.value);
      console.log("[EditBookComponent][editBookSubmit] selected image file: " + this.selectedFile);
      console.log("[EditBookComponent][editBookSubmit] authors: " + this.selectedAuthorsList);
  
      var categorySelected;
      var categoriesList = this.categoriesList;
      var categoryIdSelected = this.editBookForm.controls.bookCategory.value;
      categoriesList.forEach(function (category) {  
        if (categoryIdSelected == category.categoryId) {
          categorySelected = category;
        }
      });    

      var imageNameParameter = this.bookSelected.imageName;
      if (this.selectedFile != undefined) {
        imageNameParameter = this.selectedFile.name;
      }
  
      var editedBook: Book = {
        bookId: this.bookSelected.bookId,
        name: this.editBookForm.controls.bookName.value,
        isbn: this.editBookForm.controls.bookIsbn.value,
        category: categorySelected,
        description: this.editBookForm.controls.bookDescription.value,
        imageName: imageNameParameter,
        authors: this.selectedAuthorsList
      }
  
      if (this.selectedFile != undefined) {
        this.uploadService.uploadImage(this.selectedFile).subscribe(
          (data) => {
            console.log("[EditBookComponent][editBookSubmit] Successfull call to uploadService.uploadImage");
                  
            this.updateBook(editedBook);
          
          },
          (error) => {
            console.log("[EditBookComponent][editBookSubmit] Error when calling to uploadService.uploadImage:" + error);
          }
        );
      }
      else {
        this.updateBook(editedBook);
      }    
  
    }
    
    updateBook(book) {
      console.log("[EditBookComponent][updateBook][START]");
  
      let observableSaveBook = this.booksService.updateBook(book);
      observableSaveBook.subscribe(
        (data) => { 
          console.log("[EditBookComponent][updateBook] Successfull call to booksService.updateBook");
          this.goToRoute("booksList");
        },
        (error) => console.log("[EditBookComponent][updateBook] Error when calling to booksService.updateBook:" + error)
      );      
      
      console.log("[EditBookComponent][updateBook][END]");
    }
    
    goToRoute(strRouteParam) {
      this.router.navigateByUrl(strRouteParam);
    }
    



}

import { Component, OnInit } from '@angular/core';
import { Author } from '../model/author';
import { AuthorsService } from '../services/authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {

  authorsList: Author[];
  errorMesage: string;
  flagAuthors: boolean = false;
  booleanError: boolean = false;
  displayAuthors: boolean = false;  
  message: string; 

  constructor(private authorsService: AuthorsService, private router: Router) { }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    let observable = this.authorsService.getAuthors();
    observable.subscribe(
      (data) => {
        this.authorsList = data;
        this.displayAuthors = true;

        if (this.authorsList.length > 0) {
          this.flagAuthors = true;
          this.message = "";
        }
        else {
          this.flagAuthors = false;
          this.message = "No authors available.";
        }        
      },
      (error) => { 
        this.displayAuthors = false;
        this.errorMesage = "An error ocurred while calling authorsService (" + error + ").";
        this.booleanError = true;
      }
    );
  }

  editAuthor(author: Author) {
    console.log("[AuthorsListComponent][editAuthor] - author id:" + author.authorId);
    console.log("[AuthorsListComponent][editAuthor] - author name:" + author.firstName);

    this.goToRoute("editAuthor" + "/" + author.authorId);

  }
  
  deleteAuthor(author: Author) {
    console.log("[AuthorsListComponent][deleteAuthor][author: " + author.authorId + "]");

    if (confirm("¿Are you sure you want to delete this author?")) {

      let observableDelete = this.authorsService.deleteAuthor(author);
      observableDelete.subscribe(
        (data: any) => {
          console.log("Successfull call to categoriesService.deleteCategory(category)");
          this.loadAuthors();
        },
        (error) => {
          console.log("Error status:" + error.status);
          console.log("Error message:" + error.message);
          if (error.status == 409) {
            this.errorMesage = "An error ocurred while calling authorsService (" + error.status + ") :";
            this.errorMesage = this.errorMesage  + " The author can not be deleted.";
            this.booleanError = true;            
          }
          else {
            this.errorMesage = "An error ocurred while calling authorsService (" + error.status + " - " + error.message + ").";
            this.booleanError = true;
          }
        }
      );

    } 

  } 

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }  

}

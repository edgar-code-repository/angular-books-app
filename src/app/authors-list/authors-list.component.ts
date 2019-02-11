import { Component, OnInit } from '@angular/core';
import { Author } from '../model/author';
import { AuthorsService } from '../services/authors.service';

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
  message: string; 

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    let observable = this.authorsService.getAuthors();
    observable.subscribe(
      (data) => {
        this.authorsList = data;

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
        this.errorMesage = "An error ocurred while calling authorsService (" + error + ").";
        this.booleanError = true;
      }
    );
  }

}

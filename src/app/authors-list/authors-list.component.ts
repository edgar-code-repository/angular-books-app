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
  booleanError: boolean = false;   

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    let observable = this.authorsService.getAuthors();
    observable.subscribe(
      (data) => this.authorsList = data,
      (error) => { 
        this.errorMesage = "An error ocurred while calling authorsService (" + error + ").";
        this.booleanError = true;
      }
    );
  }

}

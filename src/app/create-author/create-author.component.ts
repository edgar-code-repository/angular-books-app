import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../model/author';
import { AuthorsService } from '../services/authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  newAuthorForm: FormGroup;
  flagErrorSaveAuthor: boolean = false;
  saveAuthorErrorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private router: Router) { }

  ngOnInit() {

    this.newAuthorForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    })     

  }

  newAuthorSubmit() {
    console.log("[CreateAuthorComponent][newAuthorSubmit] name: " + this.newAuthorForm.controls.firstName.value);

    var newAuthor: Author = {
      "authorId": 0,
      "firstName": this.newAuthorForm.controls.firstName.value,
      "lastName": this.newAuthorForm.controls.lastName.value
    }    

    let observableSaveAuthor = this.authorsService.saveAuthor(newAuthor);
    observableSaveAuthor.subscribe(
      (data) => { 
        console.log("[CreateAuthorComponent][newAuthorSubmit] Successfull call to authorsService.saveAuthor");
        this.goToRoute("authorsList");
      },
      (error) => {
        this.flagErrorSaveAuthor = true;
        this.saveAuthorErrorMessage = "Error when calling to authorsService (saveAuthor).";
        console.log("[CreateAuthorComponent][newAuthorSubmit] Error when calling to authorsService.saveAuthor:" + error); 
      }
    );   
    
  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }   

}

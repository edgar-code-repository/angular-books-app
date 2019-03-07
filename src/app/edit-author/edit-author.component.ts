import { Component, OnInit } from '@angular/core';
import { Author } from '../model/author';
import { AuthorsService } from '../services/authors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

    editAuthorForm: FormGroup;
    authorIdSelected: number;
    authorSelected: Author;

    constructor(
        private authorsService: AuthorsService, 
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedroute:ActivatedRoute) { }

    ngOnInit() {

      this.authorIdSelected = this.activatedroute.snapshot.params['authorId'];
      console.log("[EditAuthorComponent][ngOnInit] authorIdSelected: " + this.authorIdSelected);

      this.editAuthorForm = this.formBuilder.group({
        firstName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: [null,  Validators.compose([Validators.required, Validators.minLength(3)])]
      });

      let observableAuthorById = this.authorsService.getAuthorById(this.authorIdSelected);
      observableAuthorById.subscribe(
        (data) => {
          this.authorSelected = data;

          this.editAuthorForm = this.formBuilder.group({
            firstName: [data.firstName, Validators.compose([Validators.required, Validators.minLength(3)])],
            lastName: [data.lastName,  Validators.compose([Validators.required, Validators.minLength(3)])]
          });

        },
        (error) => {
          console.log("[EditAuthorComponent][ngOnInit] Error when calling to authorsService.getAuthorById():" + error.status);
          this.editAuthorForm = this.formBuilder.group({
            firstName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            lastName: [null,  Validators.compose([Validators.required, Validators.minLength(3)])]
          });         
        }      
      );    


    }


    editAuthorSubmit() {
      console.log("[EditAuthorComponent][editAuthorSubmit] first name: " + this.editAuthorForm.controls.firstName.value);
      console.log("[EditAuthorComponent][editAuthorSubmit] last name: " + this.editAuthorForm.controls.lastName.value);

      var editedAuthor: Author = {
        authorId: this.authorIdSelected,
        firstName: this.editAuthorForm.controls.firstName.value,
        lastName: this.editAuthorForm.controls.lastName.value
      };
      
      let observableSaveAuthor = this.authorsService.updateAuthor(editedAuthor);
      observableSaveAuthor.subscribe(
        (data) => { 
          console.log("[EditAuthorComponent][editAuthorSubmit] Successfull call to authorsService.updateAuthor");
          this.goToRoute("authorsList");
        },
        (error) => console.log("[EditAuthorComponent][editAuthorSubmit] Error when calling to authorsService.updateAuthor:" + error)
      );     

    
    }

    goToRoute(strRouteParam: string) {
      this.router.navigateByUrl(strRouteParam);
    }


}

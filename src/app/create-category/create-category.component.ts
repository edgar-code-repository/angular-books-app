import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  newCategoryForm: FormGroup;
  flagErrorSaveCategory: boolean = false;
  saveCategoryErrorMessage: string;
   
  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private router: Router) { }

  ngOnInit() {

    this.newCategoryForm = this.formBuilder.group({
      categoryName: [null, Validators.compose([Validators.required, Validators.minLength(10)])]
    }) 

  }

  newCategorySubmit() {
    console.log("[CreateCategoryComponent][newCategorySubmit] name: " + this.newCategoryForm.controls.categoryName.value);

    var newCategory: Category = {
      "categoryId": 0,
      "name": this.newCategoryForm.controls.categoryName.value
    }    

    let observableSaveCategory = this.categoriesService.saveCategory(newCategory);
    observableSaveCategory.subscribe(
      (data) => { 
        console.log("[CreateBookComponent][saveBook] Successfull call to categoriesService.saveCategory");
        this.goToRoute("categoriesList");
      },
      (error) => {
        this.flagErrorSaveCategory = true;
        this.saveCategoryErrorMessage = "Error when calling to categoriesService (saveCategory).";
        console.log("[CreateBookComponent][saveBook] Error when calling to categoriesService.saveCategory:" + error); 
      }
    );   
    
  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }  

}

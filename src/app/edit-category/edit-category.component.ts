import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup;
  categoryIdSelected: number;
  categorySelected: Category;

  constructor(
      private categoriesService: CategoriesService, 
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedroute: ActivatedRoute) { }

  ngOnInit() {

    this.categoryIdSelected = this.activatedroute.snapshot.params['categoryId'];
    console.log("[EditCategoryComponent][ngOnInit] categoryIdSelected: " + this.categoryIdSelected);

    this.editCategoryForm = this.formBuilder.group({
      categoryName: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    }); 

    let observableCategoryById = this.categoriesService.getCategoryById(this.categoryIdSelected);
    observableCategoryById.subscribe(
      (data) => {
        this.categorySelected = data;

        this.editCategoryForm = this.formBuilder.group({
          categoryName: [data.name, Validators.compose([Validators.required, Validators.minLength(3)])]
        });

      },
      (error) => {
        console.log("[EditCategoryComponent][ngOnInit] Error when calling to authorsService.getAuthorById():" + error.status);
        this.editCategoryForm = this.formBuilder.group({
          categoryName: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
        });       
      }      
    ); 


  }


  editCategorySubmit() {
    console.log("[EditCategoryComponent][editCategorySubmit] categoryName: " + this.editCategoryForm.controls.categoryName.value);

    var editedCategory: Category = {
      categoryId: this.categoryIdSelected,
      name: this.editCategoryForm.controls.categoryName.value
    };
    
    let observableSaveCategory = this.categoriesService.updateCategory(editedCategory);
    observableSaveCategory.subscribe(
      (data) => { 
        console.log("[EditCategoryComponent][editCategorySubmit] Successfull call to categoriesService.updateCategory");
        this.goToRoute("categoriesList");
      },
      (error) => console.log("[EditCategoryComponent][editCategorySubmit] Error when calling to categoriesService.updateCategory:" + error)
    );     

  
  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }

}

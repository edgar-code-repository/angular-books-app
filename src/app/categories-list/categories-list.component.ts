import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categoriesList: Category[];
  errorMesage: string;
  booleanError: boolean = false;
  flagCategories: boolean = false;
  displayCategories: boolean = false;
  message: string;  

  constructor(private categoriesService: CategoriesService,
              private router: Router) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    let observable = this.categoriesService.getCategories();
    observable.subscribe(
      (data) => {
        this.displayCategories = true;
        this.categoriesList = data;

        if (this.categoriesList.length > 0) {
          this.flagCategories = true;
          this.message = "";
        }
        else {
          this.flagCategories = false;
          this.message = "No categories available.";
        }        
      },
      (error) => {
        this.displayCategories = false;
        this.errorMesage = "An error ocurred while calling categoriesService (" + error + ").";
        this.booleanError = true;
      }      
    );
  }

  editCategory(category: Category) {
    console.log("[CategoriesListComponent][editCategory][category: " + category.categoryId + "]");

    this.goToRoute("editCategory" + "/" + category.categoryId);
  }  
  
  deleteCategory(category: Category) {
    console.log("[CategoriesListComponent][deleteCategory][category: " + category.categoryId + "]");

    if (confirm("¿Are you sure you want to delete this category?")) {

      let observableDelete = this.categoriesService.deleteCategory(category);
      observableDelete.subscribe(
        (data: any) => {
          console.log("Successfull call to categoriesService.deleteCategory(category)");
          this.loadCategories();
        },
        (error) => {
          console.log("Error status:" + error.status);
          console.log("Error message:" + error.message);
          if (error.status == 409) {
            this.errorMesage = "An error ocurred while calling categoriesService (" + error.status + ") :";
            this.errorMesage = this.errorMesage  + " The category can not be deleted.";
            this.booleanError = true;
          }
          else {
            this.errorMesage = "An error ocurred while calling categoriesService (" + error.status + " - " + error.message + ").";
            this.booleanError = true;            
          }
        }
      );

    }    

  } 

  goToRoute(strRouteParam) {
    this.router.navigateByUrl(strRouteParam);
  }  
   

}

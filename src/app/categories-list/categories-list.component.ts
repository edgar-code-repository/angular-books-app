import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';

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
  message: string;  

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    let observable = this.categoriesService.getCategories();
    observable.subscribe(
      (data) => {
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
        this.errorMesage = "An error ocurred while calling categoriesService (" + error + ").";
        this.booleanError = true;
      }      
    );
  }

}

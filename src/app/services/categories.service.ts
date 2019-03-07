import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  //private apiUrl = "http://localhost:9096/bookstore-rest-api/categories";
  private apiUrl = "http://localhost:9292/books-rest-api/categories";
  
  /*private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization':"Basic dXNlcjpwd2Q="
      }
    )
  };*/ 

  private httpOptions = {
    headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
    )
  };  
  
  constructor(private http: HttpClient) { }

  public getCategories() {
    //console.log("[CategoriesService][getCategories][START]");
    //console.log("[CategoriesService][getCategories][apiUrl:" + this.apiUrl + "]");

    let observable = this.http.get<Category[]>(this.apiUrl, this.httpOptions);
    
    //console.log("[CategoriesService][getCategories][END]");
    return observable;
  }  

  public getCategoryById(categoryId: Number) {
    console.log("[CategoriesService][getCategoryById][START]");
    var apiUrlGetCategory = this.apiUrl + "/" + categoryId;

    console.log("[CategoriesService][getCategoryById][apiUrlGetCategory:" + apiUrlGetCategory + "]");
    let observable = this.http.get<Category>(apiUrlGetCategory, this.httpOptions);

    console.log("[CategoriesService][getCategoryById][END]");
    return observable;
  }   

  public saveCategory(newCategory: Category) {
    //console.log("[CategoriesService][saveCategory][START]");
    //console.log("[CategoriesService][saveCategory][apiUrl:" + this.apiUrl + "]");
    //console.log("[CategoriesService][saveCategory][newCategory:" + newCategory.name + "]");

    let observable = this.http.post(this.apiUrl, newCategory, this.httpOptions);

    //console.log("[CategoriesService][saveCategory][END]");    
    return observable;

  }

  public updateCategory(category: Category) {
    console.log("[CategoriesService][updateCategory][START]");
    console.log("[CategoriesService][updateCategory][apiUrl:" + this.apiUrl + "]");
    console.log("[CategoriesService][updateCategory][category id :" + category.categoryId + "]");

    var updateUrl = this.apiUrl + "/" + category.categoryId;
    console.log("[CategoriesService][deleteCategory][apiUrl: " + updateUrl + "]");

    let observable = this.http.put(updateUrl, category, this.httpOptions);

    console.log("[CategoriesService][updateCategory][END]");    
    return observable;        
  }

  public deleteCategory(category:Category) {

    console.log("[CategoriesService][deleteCategory][START]");
    console.log("[CategoriesService][deleteCategory][category: " + category.name + "]");

    var apiUrlDelete = this.apiUrl + "/" + category.categoryId;
    console.log("[CategoriesService][deleteCategory][apiUrl: " + apiUrlDelete + "]");

    let observableDelete = this.http.delete(apiUrlDelete, this.httpOptions);

    console.log("[CategoriesService][deleteCategory][END]"); 
    return observableDelete;
    
  }  

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  //private apiUrl = "http://localhost:9096/bookstore-rest-api/categories";
  private apiUrl = "http://localhost:9101/books-api/categories";
  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization':"Basic dXNlcjpwd2Q="
      }
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
}

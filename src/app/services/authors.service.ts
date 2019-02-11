import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  //private apiUrl = "http://localhost:9096/bookstore-rest-api/authors";
  //private apiUrl = "http://localhost:9101/books-api/authors";
  private apiUrl = "http://localhost:9292/books-rest-api/authors";
  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization':"Basic dXNlcjpwd2Q="
      }
    )
  };  

  constructor(private http: HttpClient) { }

  public getAuthors() {
    let observable = this.http.get<Author[]>(this.apiUrl, this.httpOptions);
    
    return observable;
  }

}

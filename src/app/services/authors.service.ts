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

  public getAuthorById(authorId: Number) {
    console.log("[AuthorsService][getAuthorById][START]");
    var apiUrlGetAuthor = this.apiUrl + "/" + authorId;

    console.log("[AuthorsService][getAuthorById][apiUrlGetAuthor:" + apiUrlGetAuthor + "]");
    let observable = this.http.get<Author>(apiUrlGetAuthor, this.httpOptions);

    console.log("[AuthorsService][getAuthorById][END]");
    return observable;
  }   

  public saveAuthor(newAuthor: Author) {
    console.log("[AuthorsService][saveAuthor][START]");
    console.log("[AuthorsService][saveAuthor][apiUrl:" + this.apiUrl + "]");
    console.log("[AuthorsService][saveAuthor][newAuthor:" + newAuthor.firstName + "]");

    let observable = this.http.post(this.apiUrl, newAuthor, this.httpOptions);

    console.log("[AuthorsService][saveAuthor][END]");    
    return observable;

  }

  public updateAuthor(author: Author) {
    console.log("[AuthorsService][updateAuthor][START]");
    console.log("[AuthorsService][updateAuthor][apiUrl:" + this.apiUrl + "]");
    console.log("[AuthorsService][updateAuthor][author id :" + author.authorId + "]");

    var updateUrl = this.apiUrl + "/" + author.authorId;
    console.log("[AuthorsService][updateAuthor][apiUrl: " + updateUrl + "]");

    let observable = this.http.put(updateUrl, author, this.httpOptions);

    console.log("[AuthorsService][updateAuthor][END]");    
    return observable;        
  }

  public deleteAuthor(author: Author) {

    console.log("[AuthorsService][deleteAuthor][START]");
    console.log("[AuthorsService][deleteAuthor][author: " + author.firstName + "]");

    var apiUrlDelete = this.apiUrl + "/" + author.authorId;
    console.log("[AuthorsService][deleteAuthor][apiUrl: " + apiUrlDelete + "]");

    let observableDelete = this.http.delete(apiUrlDelete, this.httpOptions);

    console.log("[AuthorsService][deleteAuthor][END]"); 
    return observableDelete;
    
  }    

}

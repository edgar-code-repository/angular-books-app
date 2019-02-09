import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  //private apiUrl = "http://localhost:9096/bookstore-rest-api/books";
  private apiUrl = "http://localhost:9101/books-api/books";
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
      {
        'Content-Type': 'application/json'
      }
    )
  };

  constructor(private http: HttpClient) { }

  public getBooks() {
    //console.log("[BooksService][getBooks][START]");
    //console.log("[BooksService][getBooks][apiUrl:" + this.apiUrl + "]");

    let observable = this.http.get<Book[]>(this.apiUrl, this.httpOptions);
    
    //console.log("[BooksService][getBooks][END]");
    return observable;
  }

  public saveBook(newBook) {
    console.log("[BooksService][saveBook][START]");
    console.log("[BooksService][saveBook][apiUrl:" + this.apiUrl + "]");
    console.log("[BooksService][saveBook][newBook:" + newBook + "]");

    let observable = this.http.post(this.apiUrl, newBook, this.httpOptions);

    console.log("[BooksService][saveBook][END]");    
    return observable;

  }

  public deleteBook(book) {
    console.log("[BooksService][deleteBook][START]");
    console.log("[BooksService][deleteBook][book: " + book.name + "]");

    var apiUrlDelete = this.apiUrl + "/" + book.bookId;
    console.log("[BooksService][deleteBook][apiUrl: " + apiUrlDelete + "]");

    let observableDelete = this.http.delete(apiUrlDelete, this.httpOptions);

    console.log("[BooksService][deleteBook][END]"); 
    return observableDelete;
    
  }

}

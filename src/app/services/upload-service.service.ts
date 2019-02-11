import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

    //private apiUrl = "http://localhost:9096/bookstore-rest-api/uploadBookImage/";
    private apiUrl = "http://localhost:9292/books-rest-api/uploadBookImage/";
    private httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'multipart/form-data; boundary=HereGoes',
          }
        )
    };   

    constructor(private http: HttpClient) { }

    public uploadImage(image: File): Observable<any> {
        console.log("[UploadServiceService][uploadImage][START] image: " + image);

        const formData = new FormData();
        formData.append('file', image, image.name);


        console.log("[UploadServiceService][uploadImage] Http Post...");
        //let observableUpload = this.http.post(this.apiUrl, formData, this.httpOptions);
        //let observableUpload = this.http.post(this.apiUrl, formData);

        console.log("[UploadServiceService][uploadImage][END]");
        return this.http.post(this.apiUrl, formData);
        //return observableUpload;
    }



}

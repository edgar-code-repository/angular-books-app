import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../services/upload-service.service';

@Component({
  selector: 'app-upload-example',
  templateUrl: './upload-example.component.html',
  styleUrls: ['./upload-example.component.css']
})
export class UploadExampleComponent implements OnInit {

    selectedFile: File;

    constructor(private uploadService: UploadServiceService) { }

    ngOnInit() {
    }

    onFileChanged(event) {
        console.log("[UploadExampleComponent][onFileChanged][START]");

        this.selectedFile = event.target.files[0];

        console.log("[UploadExampleComponent][onFileChanged] file name: " + this.selectedFile.name);

    }

    onUpload() {
      console.log("[UploadExampleComponent][onUpload][START]");

      this.uploadService.uploadImage(this.selectedFile).subscribe(
        (data) => {
          console.log("[UploadExampleComponent][onUpload] Successfull call to uploadService.uploadImage");
          
        },
        (error) => {
          console.log("[UploadExampleComponent][onUpload] Error when calling to uploadService.uploadImage:" + error);
        }
      );
      
      console.log("[UploadExampleComponent][onUpload][END]");

    }

  processFile(imageInput: any) {
      console.log("[UploadExampleComponent][processFile] imageInput: " + imageInput);
      console.log("[UploadExampleComponent][processFile] name: " + imageInput.name);

      const file: File = imageInput.files[0];
      //const reader = new FileReader();

      /*this.uploadService.uploadImage(file).subscribe(
        (data) => {
          console.log("[UploadExampleComponent][processFile] Successfull call to uploadService.uploadImage");
        },
        (error) => {
          console.log("[UploadExampleComponent][processFile] Error when calling to uploadService.uploadImage:" + error);
        }
      );*/      

      /*reader.addEventListener('load', (event: any) => {

        this.uploadService.uploadImage(file).subscribe(
          (data) => {
            console.log("[UploadExampleComponent][processFile] Successfull call to uploadService.uploadImage");
          },
          (error) => {
            console.log("[UploadExampleComponent][processFile] Error when calling to uploadService.uploadImage:" + error);
          })

      });

      reader.readAsDataURL(file);    */


  }

}

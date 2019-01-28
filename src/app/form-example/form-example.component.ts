import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.css']
})
export class FormExampleComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: '',
      email: '',
    })
  
    //this.myForm.valueChanges.subscribe(console.log);
  }

  newFormSubmit() {
    console.log("[FormExampleComponent][newFormSubmit] name: " + this.myForm.controls.name.value);
    console.log("[FormExampleComponent][newFormSubmit] email: " + this.myForm.controls.email.value);
  }

}

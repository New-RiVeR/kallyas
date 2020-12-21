import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactPageForm: FormGroup;

  constructor( private fb: FormBuilder  ) {}

  ngOnInit(): void {
  }

  initContactForm(){
    this.contactPageForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  send(){
    if(this.contactPageForm.invalid){
      return;
    }
    console.log('qqqqqqqqqqqqqq')
  }


}

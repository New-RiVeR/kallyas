import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactPage } from '../models/IContactPage'
import { ContactDataService } from '../services/contact-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  contactPage: IContactPage[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private contactData: ContactDataService
    ) {
      this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
      checkbox: [false, [Validators.required]]
    })
  }

  sendFormData(): void {
    console.log(this.form.value);
    const newFormData = {id: uuid.v4(), ...this.form.value}
    this.contactData.populateUserDataArray(newFormData).subscribe((value: IContactPage) => {
      this.contactPage = [...this.contactPage, value]
    })
  }


}

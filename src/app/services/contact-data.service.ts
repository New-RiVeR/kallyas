import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactPage } from '../models/IContactPage';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private httpClient: HttpClient) { }

  populateUserDataArray(newFormData: IContactPage): Observable<IContactPage>{
    return this.httpClient.post<IContactPage>('http://localhost:3000/contact_page_data', newFormData)
  }

}

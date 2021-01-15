import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactPage } from '../models/IContactPage';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private httpClient: HttpClient) { }

  populateUserDataArray(newFormData: IContactPage): Observable<IContactPage>{
    return this.httpClient.post<IContactPage>(`${environment.apiUrl}/contact_page_data`, newFormData)
  }

}

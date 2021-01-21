import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchItem } from '../models/IWatch';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private httpClient: HttpClient) { }

  getWatches(): Observable<WatchItem[]> {
    return this.httpClient.get<WatchItem[]>(`${environment.apiUrl}/watches`);
  }
  
  addWatch(newWatch: WatchItem): Observable<WatchItem>{
    return this.httpClient.post<WatchItem>(`${environment.apiUrl}/watches`, newWatch);
  }

  editWatch(id: string, editedWatch: WatchItem):Observable<WatchItem>{
    return this.httpClient.put<WatchItem>(`${environment.apiUrl}/watches/${id}`, editedWatch);    
  }

  removeWatch(id: string): Observable<{}> {
    return this.httpClient.delete(`${environment.apiUrl}/watches/${id}`)
  }

}

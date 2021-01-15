import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchItem } from '../models/IWatch';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  url = 'http://localhost:3000/watches/';

  constructor(private httpClient: HttpClient) { }

  getWatches(): Observable<WatchItem[]> {
    return this.httpClient.get<WatchItem[]>(this.url);
  }

  getSingleWatch(id): Observable<WatchItem>{
    return this.httpClient.get<WatchItem>(`${this.url}${id}`)
  }
  
  addWatch(newWatch: WatchItem): Observable<WatchItem>{
    return this.httpClient.post<WatchItem>(this.url, newWatch);
  }

  editWatch(id: string, editedWatch: WatchItem):Observable<WatchItem>{
    return this.httpClient.put<WatchItem>(`http://localhost:3000/watches/${id}`, editedWatch);    
  }

  removeWatch(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/watches/${id}`)
  }

}

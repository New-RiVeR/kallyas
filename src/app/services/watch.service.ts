import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchItem } from '../models/IWatch';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private httpClient: HttpClient) { }

  getWatches(): Observable<WatchItem[]> {
    return this.httpClient.get<WatchItem[]>('http://localhost:3000/watches');
  }
  
  addWatch(newWatch: WatchItem): Observable<WatchItem>{
    return this.httpClient.post<WatchItem>('http://localhost:3000/watches', newWatch);
  }

  editWatch(editedWatch: WatchItem): Observable<WatchItem>{
    return this.httpClient.put<WatchItem>('http://localhost:3000/watches', editedWatch);
  }

  removeWatch(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/watches/${id}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchItem } from '../models/IWatch';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private httpClient: HttpClient) { }

  getWatches(): Observable<WatchItem[]>{
    return this.httpClient.get<WatchItem[]>('http://localhost:3000/watches');
  }

  addWatch(formValue): Observable<WatchItem>{
    const watch = formValue;
    return this.httpClient.post<WatchItem>('http://localhost:3000/watches', watch);
  }

  removeWatch(id: number): Observable<{}>{
    return this.httpClient.delete(`http://localhost:3000/watches/${id}`);
  }

}

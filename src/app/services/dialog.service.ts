import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WatchItem } from '../models/IWatch';

const BASE_WATCH_DATA: WatchItem = {
  id: '',
  name: '',
  description: '',
  price: 0,
  country: '',
  countryFlag: '',
  year: 0,
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  watchSelected$: BehaviorSubject<WatchItem> = new BehaviorSubject(BASE_WATCH_DATA);

  constructor() { }
}

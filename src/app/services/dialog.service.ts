import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  watchSelected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}

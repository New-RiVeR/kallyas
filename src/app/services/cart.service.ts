import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}

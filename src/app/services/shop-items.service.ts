import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopItem } from '../models/Shop-item';

@Injectable({
  providedIn: 'root'
})
export class ShopItemsService {

  constructor(private httpClient: HttpClient) {}

  getShopItems():Observable<ShopItem[]>{
    return this.httpClient.get<ShopItem[]>('http://localhost:3000/watches');
  }

}

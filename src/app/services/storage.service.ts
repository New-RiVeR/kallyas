import { Injectable } from '@angular/core';
import { WATCHES } from '../shop/shop.constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private sharedData;
  private defaultData = [...WATCHES];
  private dataFromStorage = localStorage.getItem('Watches') ? JSON.parse(localStorage.getItem('Watches')) : [];

  constructor() {
    this.sharedData = [...this.defaultData, ...this.dataFromStorage];
  }

  public getSharedData() {
    return this.sharedData;
  }

  public pushToSharedData(watch) {
    this.sharedData.push(watch);
    console.log(this.sharedData)
    return this.sharedData;
  }
}

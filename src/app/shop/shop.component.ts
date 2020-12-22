import { Component, OnInit } from '@angular/core';
import { FILTER_ITEMS, SORT_ITEMS, WATCHES } from './shop.constants';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  watches = WATCHES;
  sort_items = SORT_ITEMS;
  filter_items = FILTER_ITEMS;
  showButton: boolean;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  sortItemsBy(event){
    this.watches.sort((a, b) => {
      if(a[event.value] > b[event.value]){
        return 1;
      }
      return -1
    })
  }

  filterItemsBy(){
    this.watches = this.watches.filter(item => item.price > 200);
  }

  clickOnMoreInfoButton(){
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  clickHere(){
    console.log('***************')
  }
}

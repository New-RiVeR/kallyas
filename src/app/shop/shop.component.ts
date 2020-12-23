import { Component, OnInit } from '@angular/core';
import { FILTER_ITEMS, SORT_ITEMS, WATCHES } from './shop.constants';
import { CartService } from '../services/cart.service'

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
  itemsCart:any = [];
  cartNumber: number = 0;
  
  constructor(private cart: CartService) { 
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

  addCart(watch){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet: any = [];
      storeDataGet.push(watch)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet))
    }else{
      let id = watch.id
      let index: number = -1
      this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
      for(let i = 0; i< this.itemsCart.length; i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].qnt = watch.qnt;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(watch);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
      }
      else{
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
      }
    }
    this.cartNumberFunction()
  }

  cartNumberFunction(){
    let cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.cart.cartSubject.next(this.cartNumber)
  }

}

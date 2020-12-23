import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITEMS_HEADER, NAV_MENU, PHOTOS } from './header.constants';
import { CartService } from '../services/cart.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenu = NAV_MENU;
  items = ITEMS_HEADER;
  photos = PHOTOS;
  cartItem:number = 0;

  constructor(private router: Router, private cart: CartService) {
    this.cart.cartSubject.subscribe((data) => {
      this.cartItem = data;
    })
   }

  ngOnInit(): void {
    this.cartItemFunction()
  }

  navigate(item): void {
    this.router.navigate([item.link]);
    item.active = true;
  }

  cartItemFunction(){
    if(localStorage.getItem('localCart') != null){
      let cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length
    }
  }



}

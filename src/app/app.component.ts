import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.cartService.cartItemsLength$.next(cartItems.length)
  }
  
}


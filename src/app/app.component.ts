import {  ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { AccountService } from './services';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private ToastrService: ToastrService
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      this.cartService.cartItemsLength$.next(cartItems.length);
    }
    
  }

  user: User;

  logout() {
    this.accountService.logout();
  }
}

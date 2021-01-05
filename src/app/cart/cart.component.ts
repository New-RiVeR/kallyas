import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/IWatch';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.updateTotalPriceInCart();
  }

  cartDetails(){
    const watches = JSON.parse(localStorage.getItem('cartItems'));
    if (watches) {
      this.cartItems = watches;
    }
  }

  incrementQuantity(cartItem: CartItem): void {
    cartItem.amount++;
    this.cartItems = [...this.cartItems];
    // for(let i = 0; i < this.cartItems.length; i++){
    //   if(this.cartItems[i].id === watchId){
    //     if(watchCount != 15){
    //       this.cartItems[i].qnt = parseInt(watchCount) + 1;
    //     }
    //   }
    // }
    // localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    this.updateTotalPriceInCart()
  }

  decrementQuantity(cartItem: CartItem): void {
    if (cartItem.amount > 1) {
      cartItem.amount--;
      this.cartItems = [...this.cartItems];
    }
    // for(let i = 0; i < this.cartItems.length; i++){
    //   if(this.cartItems[i].id === watchId){
    //     if(watchCount != 1){
    //       this.cartItems[i].qnt = parseInt(watchCount) - 1;
    //     }
    //   }
    // }
    // localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    this.updateTotalPriceInCart();
  }

  updateTotalPriceInCart(): void {
    if (this.cartItems) {
      this.totalAmount = this.cartItems.reduce(function(acc, value) {
        return acc + (value.price * value.amount)
      }, 0)
    }
  }

  removeAllItemsFromCart(){
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.cartService.cartItemsLength$.next(0);
    this.totalAmount = 0;
  }
}

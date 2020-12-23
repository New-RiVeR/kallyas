import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  getCartDetails:any = [];
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadTotalPriceInCart();
  }

  cartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')) 
    }
  }

  incrementQuantity(watchId, watchCount){
    for(let i = 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].id === watchId){
        if(watchCount != 15){
          this.getCartDetails[i].qnt = parseInt(watchCount) + 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.loadTotalPriceInCart()
  }

  decrementQuantity(watchId, watchCount){
    for(let i = 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].id === watchId){
        if(watchCount != 1){
          this.getCartDetails[i].qnt = parseInt(watchCount) - 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.loadTotalPriceInCart();
  }

  loadTotalPriceInCart(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      this.total = this.getCartDetails.reduce(function(acc, value) {
        return acc + (value.price * value.qnt)
      }, 0)
    }
  }

  removeAllItemsFromCart(){
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
  }


}

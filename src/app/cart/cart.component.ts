import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  getCartDetails:any = [];

  constructor() { }

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')) 
      console.log(this.getCartDetails);
      
    }
  }

}

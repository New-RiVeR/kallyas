import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITEMS_HEADER, NAV_MENU, PHOTOS } from './header.constants';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navMenu = NAV_MENU;
  items = ITEMS_HEADER;
  photos = PHOTOS;
  cartItemsLength: number;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItemsLength();
  }

  private getCartItemsLength(): void {
    this.cartService.cartItemsLength$.subscribe((itemsLength: number) => {
      console.log('itemsLength: ', itemsLength);
      this.cartItemsLength = itemsLength;
    });
  }

  navigate(item): void {
    this.router.navigate([item.link]);
    item.active = true;
  }
}

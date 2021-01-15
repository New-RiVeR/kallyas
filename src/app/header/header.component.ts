import { LoginComponent } from './../auth/login.component';
import { DialogService } from './../services/dialog.service';
import { User } from './../models/user';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITEMS_HEADER, NAV_MENU, PHOTOS } from './header.constants';
import { CartService } from '../services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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
  

  constructor(
    private router: Router, 
    private cartService: CartService,
    private dialog: MatDialog,
    // private userSubject: BehaviorSubject<User>,
    // public user: Observable<User>,
    ) {}

  ngOnInit(): void {
    this.getCartItemsLength();
  }

  private getCartItemsLength(): void {
    this.cartService.cartItemsLength$.subscribe((itemsLength: number) => {
      this.cartItemsLength = itemsLength;
    });
  }

  navigate(item): void {
    this.router.navigate([item.link]);
    item.active = true;
  }

  openLogDialog(name: string){
    if (name === 'login') {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

}

import { LoginComponent } from './../auth/login.component';
import { DialogService } from './../services/dialog.service';
import { User } from './../models/user';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NAV_MENU, PHOTOS } from './header.constants';
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
  photos = PHOTOS;
  cartItemsLength: number;
  isUserLoggedIn: boolean;
  constructor(
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialog,
    private accountService: AccountService
  ) // private userSubject: BehaviorSubject<User>,
  // public user: Observable<User>,
  {}

  ngOnInit(): void {
    this.getCartItemsLength();
    this.accountService.userSubject.subscribe((User) => {
      console.log('show: ', User);
    });
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

  openLogDialog() {
    this.isUserLoggedIn = true;
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {});
    }


  isAdminLogIn() {
    if (this.accountService.userValue) {
      this.router.navigate(['../users']);
  }
  }
  // isUserLoggedIn() {
  //   if () {}}
  user: User;
  logOut() {
    this.accountService.logout();
    this.isUserLoggedIn = false;
  }
}


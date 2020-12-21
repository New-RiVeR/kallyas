import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITEMS_HEADER, NAV_MENU, PHOTOS } from './header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenu = NAV_MENU;
  items = ITEMS_HEADER;
  photos = PHOTOS

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  navigate(item): void {
    this.router.navigate([item.link]);
    // this.makeAllNavItemsInActive();
    item.active = true;
  }

  basketClick(){
    console.log('you clicked on basket icon')
  }

  // makeAllNavItemsInActive(): void {
  //   this.navMenu.map(menuItem => menuItem.active = false);
  // }

}

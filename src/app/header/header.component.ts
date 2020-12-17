import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  basketClick(){
    console.log('you clicked on basket icon')
  }

}

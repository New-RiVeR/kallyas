import { Component, OnInit } from '@angular/core';
import { ItemsHeader, NAVMENU } from './header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenu = NAVMENU;
  items = ItemsHeader;

  constructor() { }

  ngOnInit(): void {
  }

}

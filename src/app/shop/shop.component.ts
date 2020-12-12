import { Component, OnInit } from '@angular/core';
import { WATCHES } from './shop.constants';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  watches = WATCHES;
  
  constructor() { }

  ngOnInit(): void {
  }

}

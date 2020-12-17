import { Component, OnInit } from '@angular/core';
import { watch } from 'fs';
import { WATCHES } from './shop.constants';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  watches = WATCHES;
  showButton: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  mouseOver(id){
    const currentWatch = this.watches.find(watch => watch.id === id);
    // currentWatch.btnActive = true;
  }

  mouseOut(id){
    const outWatch = this.watches.find(watch => watch.id === id);
    // outWatch.btnActive = false

  }

  clickMoreInfoBtn(){
    console.log('qwerty');
  }


}

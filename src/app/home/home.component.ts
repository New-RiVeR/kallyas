import { Component, OnInit } from '@angular/core';
import { HOME_CONTENT_BLOCK } from './home.constants';
import { WATCHES } from './home.constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  main_block = HOME_CONTENT_BLOCK;
  changeBlockDirection = false;
  watches = WATCHES;
  showButton: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  mouseOver(id){
    const currentWatch = this.watches.find(watch => watch.id === id);
   
  }

  mouseOut(id){
    const outWatch = this.watches.find(watch => watch.id === id);
  

  }

  clickMoreInfoBtn(){
    
  }

}

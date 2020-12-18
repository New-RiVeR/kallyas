import { Component, OnInit } from '@angular/core';
import { MAIN_HEADER_BLOCK } from './about.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // header_block = ABOUT_HEADER_BLOCK;
  main_block = MAIN_HEADER_BLOCK;
  changeBlockDirection = false;

  constructor() { 
    this.main_block.find((obj) => {
      if (obj.id % 2){
        console.log(obj);
        this.changeBlockDirection = true;
      }
    })
   }
   

  ngOnInit(): void {
    
  }

    


  }


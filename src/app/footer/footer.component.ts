import { Component, OnInit } from '@angular/core';
import { CUSTOMER_LINKS, FOLLOW_US_BLOCK } from './footer.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  customer = CUSTOMER_LINKS;
  followBlock = FOLLOW_US_BLOCK;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop(event){
    // console.log(event);
    // window.scroll(0,0);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 3);
  }

}

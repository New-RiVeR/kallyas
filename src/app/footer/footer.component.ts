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

}

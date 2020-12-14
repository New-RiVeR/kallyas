import { Component, OnInit } from '@angular/core';
import { DESCRIPTION, LINKS, PHOTOS } from './not-found.constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  description = DESCRIPTION;
  photos = PHOTOS
  links = LINKS;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  watches = [
    {
      name: 'Watch 1',
      description: 'Description 1',
      price: 1
    },
    {
      name: 'Watch 2',
      description: 'Description 2',
      price: 2
    },
    {
      name: 'Watch 3',
      description: 'Description 3',
      price: 3
    },
    {
      name: 'Watch 4',
      description: 'Description 4',
      price: 4
    },
    {
      name: 'Watch 5',
      description: 'Description 5',
      price: 5
    },
    {
      name: 'Watch 6',
      description: 'Description 6',
      price: 6
    },
    {
      name: 'Watch 7',
      description: 'Description 7',
      price: 7
    },
    {
      name: 'Watch 8',
      description: 'Description 8',
      price: 8
    },
    {
      name: 'Watch 9',
      description: 'Description 9',
      price: 9
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

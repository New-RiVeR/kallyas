import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FILTER_ITEMS, SORT_ITEMS, WATCHES } from './shop.constants';
import { CartService } from '../services/cart.service';
import { MoreInfoDialog } from '../more-info--dialog/more-info--dialog';
import { DialogService } from '../services/dialog.service';
import { CartItem, WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  watches: WatchItem[] = [];
  sort_items = SORT_ITEMS;
  filter_items = FILTER_ITEMS;
  showButton: boolean;
  itemsCart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private dialogHelper: DialogService,
    private watchService: WatchService
  ) {}

  ngOnInit(): void {
    this.loadWatches();
  }

  private loadWatches(): void {
    this.watchService.getWatches().subscribe((value: WatchItem[]) => {
      this.watches = value;
    });
  }

  sortItemsBy(event): void {
    console.log(event);
    
    this.watches.sort((a, b) => {
      if (a[event.value] > b[event.value]) {
        return 1;
      }
      return -1;
    });
  }

  filterItemsBy(): void {
    this.watches = this.watches.filter((item) => item.price > 200);
  }

  openDialog(watch: WatchItem): void {
    this.dialogHelper.watchSelected$.next(watch);
    const dialogRef = this.dialog.open(MoreInfoDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addToCart(watch: WatchItem): void {
    const watchItem = {
      id: watch.id,
      name: watch.name,
      price: watch.price,
      amount: 1,
      image: watch.image,
    };
    const watchAlreadyExist = this.itemsCart.find(item => item.id === watchItem.id);
    if (watchAlreadyExist) {
      watchAlreadyExist.amount++;
    } else {
      this.itemsCart = [...this.itemsCart, watchItem];
    }
    localStorage.setItem('cartItems', JSON.stringify(this.itemsCart));
    this.cartService.cartItemsLength$.next(this.itemsCart.length);
  }

}

import { Component, OnInit } from '@angular/core';
import { WatchItem } from '../models/IWatch';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './more-info--dialog.html',
  styleUrls: ['./more-info--dialog.scss']
})
export class MoreInfoDialog implements OnInit {
  selectedWatch: WatchItem;

  constructor(private dialogHelper: DialogService) { }

  ngOnInit(): void {    
    this.selectedWatch = this.dialogHelper.watchSelected$.getValue();
  }
}

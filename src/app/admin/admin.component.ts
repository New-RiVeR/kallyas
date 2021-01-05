import { Component, OnInit } from '@angular/core';
// import * as uuid from 'uuid';
import {v4 as uuid} from 'uuid'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { MoreInfoDialog } from '../more-info--dialog/more-info--dialog';
import { MatDialog } from '@angular/material/dialog';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  watchForm: FormGroup;
  watchesArray: WatchItem[] = [];
   
  constructor(private fb: FormBuilder, public dialog: MatDialog, private dialogHelper: DialogService, private watchService: WatchService) { 
      this.watchForm = this.fb.group({
        title: ['',[Validators.required, Validators.minLength(2)]],
        year: [],
        country: [],
        description: [],
        price: []
      })
     }

  ngOnInit(): void {
    this.watchService.getWatches().subscribe((value: WatchItem[]) =>{
      this.watchesArray = value;
    })
  }

  submit(){
    const formValue = {...this.watchForm.value, id: uuid()};
    console.log(formValue);
    
    this.watchService.addWatch(formValue).subscribe((newWatch: WatchItem) => {
      console.log(newWatch)
      this.watchesArray.push(newWatch);
      console.log(this.watchesArray);
    })
    this.watchForm.reset();
  }

  removeWatch(id: number){
    this.watchService.removeWatch(id).subscribe(() => {
      this.watchesArray = this.watchesArray.filter(watch => watch.id !== id);
    })
  }

  saveEdit(){}

  openDialog(watch) {
    this.dialogHelper.watchSelected$.next(watch);
    const dialogRef = this.dialog.open(MoreInfoDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

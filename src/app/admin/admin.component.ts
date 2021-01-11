import * as uuid from 'uuid';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { MoreInfoDialog } from '../more-info--dialog/more-info--dialog';
import { MatDialog } from '@angular/material/dialog';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  watchForm: FormGroup;
  watchesArray: WatchItem[] = [];
  buttonEdit: boolean;
  selectedWatch:any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogHelper: DialogService,
    private watchService: WatchService
  ) {
    this.initWatchForm();
  }

  ngOnInit(): void {
    this.loadWatches();
  }
  
  private initWatchForm(): void {
    this.watchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      year: [],
      country: [],
      description: [],
      price: [],
    });
  }

  private loadWatches(): void {
    this.watchService.getWatches().subscribe((value: WatchItem[]) => {
      this.watchesArray = value;
    });
  }

  addNewWatch(): void {
    const newWatch = { id: uuid.v4(), ...this.watchForm.value };
    this.watchService.addWatch(newWatch).subscribe((watch: WatchItem) => {
      this.watchesArray = [...this.watchesArray, watch];
    });
    this.watchForm.reset();
  }

  saveEdit(): void {
    const editedWatch = {...this.watchForm.value}
    console.log(editedWatch);
    console.log(this.selectedWatch);
    this.watchService.editWatch(this.selectedWatch.id,this.watchForm.value)
      .subscribe((newEditedWatch: WatchItem) => {
        console.log('Form: ', this.watchForm.value);
        console.log('newEditedWatch', newEditedWatch);
      this.watchesArray = [...this.watchesArray, newEditedWatch];
    })
    this.buttonEdit = false;
    this.watchForm.reset();
  } 

  removeWatch(id: string): void {
    this.watchService.removeWatch(id).subscribe(() => {
      this.watchesArray = this.watchesArray.filter((watch) => watch.id !== id);
    });
  }
  
  editCurrentWatch(watch) {
    this.buttonEdit = true;
    this.selectedWatch = watch;
    this.watchForm.patchValue(this.selectedWatch)
  }

  openDialog(watch: WatchItem) {
    this.dialogHelper.watchSelected$.next(watch);
    const dialogRef = this.dialog.open(MoreInfoDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

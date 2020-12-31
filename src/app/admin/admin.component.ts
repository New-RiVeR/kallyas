import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv1 } from 'uuid';
import { StorageService } from '../services/storage.service';
import { INPUTS_FIELDS } from './admin.constants';
import { DialogService } from '../services/dialog.service';
import { MoreInfoDialog } from '../more-info--dialog/more-info--dialog';
import { MatDialog } from '@angular/material/dialog';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  inputs = INPUTS_FIELDS;
  watchForm: FormGroup;
  formIsEditing: boolean;
  formSubmitted: boolean;
  watchesArray = [];
  watches = [];
  watch: any = {};
  selectedWatch: any;
  dataFromStarage = [];

  arrayItems = [
    {
      name: 'Title',
      value: 'name'
    },
    {
      name: 'Description',
      value: 'description'
    },
    {
      name: 'Price',
      value: 'price'
    }
  ];


  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    public dialog: MatDialog,
    private dialogHelper: DialogService,
    ) { }

  ngOnInit() {
    this.initWatchForm();
    this.populateWatchesArray(this.loadDataFromStorage());
    this.arrayFromStorage()
  }

  showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.formSubmitted);
  }

  initWatchForm() {
    this.watchForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      year: ['', [Validators.required, Validators.min(1800)]],
      country: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(1)]]
    })
  }

  submit(): void {
    // this.formSubmitted = true;
    console.log('!!!!!!!!!!!!!!!');
    if (this.watchForm.invalid) {
    this.formSubmitted = true;
      return;
    }else{
      const obj = { ...this.watchForm.value, id: uuidv1() }
      this.watch = Object.assign(this.watch, obj);
      this.watchesArray.push(obj);
      this.addClockInStorage(this.watch);
      this.watchForm.reset();
    }

  }

  deleteItem(id: string) {
    this.watchesArray = this.watchesArray.filter(watch => watch.id !== id);
    localStorage.setItem('Watches', JSON.stringify(this.watchesArray));
  }

  editWatch(watch) {
    this.selectedWatch = watch;
    this.watchForm.patchValue(watch);
    this.formIsEditing = true;
  }

  saveEdit() {
    const selectedWatch = this.watchesArray.find(watch => watch.id === this.selectedWatch.id);
    selectedWatch.title = this.watchForm.value.title
    selectedWatch.description = this.watchForm.value.description;
    selectedWatch.country = this.watchForm.value.country;
    selectedWatch.price = this.watchForm.value.price;
    selectedWatch.year = this.watchForm.value.year;
    console.log(selectedWatch);
    this.watchForm.reset()
    this.formIsEditing = false;
  }

  addClockInStorage(watch) {
    if (localStorage.getItem('Watches')) {
      this.watches = JSON.parse(localStorage.getItem('Watches'));
      this.watches = [watch, ...this.watches];
    } else {
      this.watches = [watch]
    }
    localStorage.setItem('Watches', JSON.stringify(this.watches));
    this.storageService.pushToSharedData(watch);
  }

  loadDataFromStorage(): any[] {
    let data = JSON.parse(localStorage.getItem('Watches'));
    console.log(data);
    return data;
  }

  populateWatchesArray(watches: any): void {
    this.watchesArray = watches || [];
  }

  arrayFromStorage() {
    this.dataFromStarage.push(JSON.parse(localStorage.getItem('Watches')));
    console.log(this.dataFromStarage);
  }

  openDialog(watch) {
    this.dialogHelper.watchSelected$.next(watch);
    const dialogRef = this.dialog.open(MoreInfoDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

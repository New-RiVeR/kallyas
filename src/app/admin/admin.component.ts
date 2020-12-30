import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv1 } from 'uuid';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  watchForm: FormGroup;
  watchesArray = [];
  watch: any = {};
  watchIndex = 1;
  watches = [];
  formIsEditing: boolean;
  selectedWatch:any;
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

  dataFromStarage = [];

  constructor(private fb: FormBuilder, private storageService: StorageService) {
  }

  ngOnInit() {
    this.initWatchForm();
    this.populateWatchesArray(this.loadDataFromStorage());
    this.arrayFromStorage()
  }

  initWatchForm() {
    this.watchForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  submit(): void {
    if (this.watchForm.invalid) {
      return;
    }
    const obj = { ...this.watchForm.value, id: uuidv1() }
    this.watchesArray.push(obj);
    this.watch = Object.assign(this.watch, obj);
    this.addClockInStorage(this.watch);
    this.watchForm.reset();
  }
  
  deleteItem(id: string) {
    this.watchesArray = this.watchesArray.filter(watch => watch.id !== id);
    localStorage.setItem('Watches', JSON.stringify(this.watchesArray));
  }

  sortBy(e) {
    console.log(e)
    this.watchesArray.sort((a, b) => {
      if (a[e.value] > b[e.value]) {
        return 1
      }
      return -1
    })
  }

  editWatch(watch) {
    this.selectedWatch = watch;
    this.watchForm.patchValue(watch);
    this.formIsEditing = true;
  }

  edit(){
    const selectedWatch = this.watchesArray.find(watch => watch.id === this.selectedWatch.id);
    selectedWatch.name = this.watchForm.value.name
    console.log(selectedWatch);
  }

  filter(){
    this.watchesArray = this.watchesArray.filter(watch => watch.price > 30)
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

  arrayFromStorage(){
    this.dataFromStarage.push(JSON.parse(localStorage.getItem('Watches')));
    console.log(this.dataFromStarage);
    
  }

}

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
  // watchIndex = 1;
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
      name: ['', [Validators.required, Validators.minLength(5)]],
      year: ['', [Validators.required,Validators.min(1800)]],
      country: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required,Validators.min(1)]]
    })
  }

  submit(): void {
    console.log('________-')
    if (this.watchForm.invalid) {
      return;
    }
    const obj = { ...this.watchForm.value, id: uuidv1() }
    this.watch = Object.assign(this.watch, obj);
    this.watchesArray.push(obj);
    this.addClockInStorage(this.watch);
    this.watchForm.reset();
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

  saveEdit(){
    const selectedWatch = this.watchesArray.find(watch => watch.id === this.selectedWatch.id);
    selectedWatch.name = this.watchForm.value.name
    selectedWatch.description = this.watchForm.value.description;
    selectedWatch.country = this.watchForm.value.country;
    selectedWatch.price = this.watchForm.value.price;
    selectedWatch.year = this.watchForm.value.year;
    console.log(selectedWatch);
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

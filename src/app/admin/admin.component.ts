import * as uuid from 'uuid';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';
import { MatTableDataSource } from '@angular/material/table';
import { WATCHES_SCHEMA } from './admin.constants';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  watchForm: FormGroup;
  watchesArray: WatchItem[] = [];
  buttonEdit: boolean;
  formSubmitted: boolean;
  public showError;

  displayedColumns: string[] = ['name', 'description', 'price', 'country', 'year', '$$edit', '$$delete'];
  dataSource = new MatTableDataSource<WatchItem>(this.watchesArray)
  dataSchema = WATCHES_SCHEMA;  //

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private watchService: WatchService
  ) {
    this.initWatchForm();
  }

  ngOnInit(): void {
    this.loadWatches();
    console.log(this.watchesArray);
    console.log(this.dataSource.data);

    this.dataSource.paginator = this.paginator
  }

  private initWatchForm(): void {
    this.watchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      year: ['', [Validators.required, Validators.min(1000)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(2)]],
    });
  }

  private loadWatches(): void {
    this.watchService.getWatches().subscribe((value: WatchItem[]) => {
      this.dataSource = new MatTableDataSource(value)
    });
  }

  addNewWatch(): void {
    const newWatch = { id: uuid.v4(), ...this.watchForm.value };
    this.watchService.addWatch(newWatch).subscribe((watch: WatchItem) => {
      this.watchesArray = [...this.watchesArray, watch];
    });
    this.watchForm.reset();
    console.log(this.dataSource.data);
  }

  editCurrentWatch() {
    // this.buttonEdit = true;
    console.log('Edit');
  }

  saveEdit() {
    // this.buttonEdit = false;
    console.log('Done');
  }

  removeWatch(element): void {
    console.log(element.id);
    this.watchService.removeWatch(element.id).subscribe(() => {
      this.watchesArray = this.watchesArray.filter((watch) => watch.id !== element.id)
    })
  }

  errors = function showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.formSubmitted)
  }

  showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.formSubmitted)
  }



}

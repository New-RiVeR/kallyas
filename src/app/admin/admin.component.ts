import * as uuid from 'uuid';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';
import { MatTableDataSource } from '@angular/material/table';
import { WATCHES_SCHEMA } from './admin.constants';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  watchesArray: WatchItem[] = [];

  displayedColumns: string[] = ['name', 'description', 'price', 'country', 'year', 'edit', '$$delete'];
  dataSource = new MatTableDataSource<WatchItem>(this.watchesArray)
  dataSchema = WATCHES_SCHEMA;  //

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private watchService: WatchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadWatches();
  }

  private loadWatches(): void {
    this.watchService.getWatches().subscribe((value: WatchItem[]) => {
      this.dataSource = new MatTableDataSource(value)
    });
  }

  addWatch(){
    this.router.navigate(['admin','add'])
  }

  editCurrentWatch(element) {
    this.router.navigate(['admin', element.id])
  }

  removeWatch(element): void {
    this.watchService.removeWatch(element.id).subscribe(() => {
      this.loadWatches()
    })
  }


}

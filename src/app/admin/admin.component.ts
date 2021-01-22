import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';
import { MatTableDataSource } from '@angular/material/table';
import { WATCHES_SCHEMA } from './admin.constants';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  watchesArray: WatchItem[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'country', 'year', 'edit', '$$delete'];
  dataSource = new MatTableDataSource<WatchItem>(this.watchesArray)
  dataSchema = WATCHES_SCHEMA;  //

  constructor(
    private watchService: WatchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadWatches();
    this.dataSource.paginator = this.paginator;
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

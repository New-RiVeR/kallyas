import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.scss']
})
export class EditWatchComponent implements OnInit {

  watch: WatchItem;
  editWatchForm: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private watchService: WatchService,
    private fb: FormBuilder
  ) {
    this.getSingleWatchFromDB()
  }
  
  ngOnInit(): void {
    this.initEditForm()
  }

  private getSingleWatchFromDB() {
    console.log('this.activatedRoute.: ', this.activatedRoute.queryParams);
    this.activatedRoute.params
    .subscribe(params =>
      this.watchService.getSingleWatch(params.id)
      .subscribe(value => this.editWatchForm.patchValue(value))
      );
  }


  private initEditForm() {
    this.editWatchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      year: ['', [Validators.required, Validators.min(1000)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(2)]],
    })
  }

  saveEditWatch(watch){
    console.log(watch);
  }

  
  navigateBack(){
    this.router.navigate(['admin'])
  }


}

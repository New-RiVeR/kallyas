import * as uuid from 'uuid';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';
import { HttpClient } from '@angular/common/http';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.scss']
})
export class EditWatchComponent implements OnInit {

  watch: WatchItem;
  watchForm: FormGroup
  formSubmitted: boolean;
  isAddWatchPage: boolean;
  saveActionButton: boolean;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private watchService: WatchService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.getSingleWatchFromDB()
    this.addNewWatchForm();
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.watchForm = this.fb.group({
      name: ['ttttt', [Validators.required, Validators.minLength(5)]],
      year: ['22222', [Validators.required, Validators.min(1000)]],
      country: ['uuu', [Validators.required, Validators.minLength(3)]],
      description: ['yyyyy', [Validators.required, Validators.minLength(5)]],
      price: ['34333', [Validators.required, Validators.min(2)]],
      image: [null, Validators.required]
    })
  }

  private addNewWatchForm() {
    this.activatedRoute.url.subscribe(val => {
      if (val[1].path === 'add') {
        this.isAddWatchPage = true
      }
    });
  }

  private getSingleWatchFromDB() {
    this.activatedRoute.params
      .subscribe(params =>
        this.watchService.getSingleWatch(params.id)
          .subscribe(value => this.watchForm.patchValue(value))
      );
  }

  addNewWatch() {
    console.log(this.imageChangedEvent);
    let formValue = this.watchForm.value;
    const newWatch = { id: uuid.v4(), ...formValue }
    this.watchService.addWatch(newWatch).subscribe((watch) => {
      this.watch = watch;
    })
    this.watchForm.reset();
  }

  saveEditWatch() {
    const formValue = this.watchForm.value
    this.activatedRoute.params
      .subscribe(params =>
        this.watchService.editWatch(params.id, formValue).subscribe((editedWatch: WatchItem) => {
          this.watch = editedWatch;
        }))
    this.saveActionButton = true;
  }

  fileChangeEvent(event: any): void {
    console.log('asd' ,event);
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  navigateBack() {
    this.router.navigate(['admin'])
  }

  navigateToAdminPage() {
    this.router.navigate(['admin'])
  }

  errors = function showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.formSubmitted)
  }

  showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.formSubmitted)
  }



}

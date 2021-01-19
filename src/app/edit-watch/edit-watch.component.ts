import * as uuid from 'uuid';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchItem } from '../models/IWatch';
import { WatchService } from '../services/watch.service';
import { HttpClient } from '@angular/common/http';



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
  uploadedImage;
  selectedFile: File = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private watchService: WatchService,
    private fb: FormBuilder,
    private httpClient: HttpClient) {
    this.getSingleWatchFromDB()
    this.addNewWatchForm();
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.watchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      year: ['', [Validators.required, Validators.min(1000)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(2)]],
      image: ['']
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

  onFileSelected(e){
    // if(e.target.files){
    //   let reader= new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.uploadedImage = event.target.result;
    //   }
    // }
    this.selectedFile = e.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:3000/watches', fd)
      .subscribe(res => {
        console.log(res);
      })
  }

  addNewWatch() {
    let formValue = this.watchForm.value;
    const newWatch = {id: uuid.v4(), ...formValue}
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

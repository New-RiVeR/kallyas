import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';
import { RegisterComponent } from './../auth/register.component';
import { AccountService, AlertService } from '../services';
import { MatDialog } from '@angular/material/dialog';
import * as uuid from 'uuid';
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['../home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get controls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.accountService
      .login(user)
      .pipe(take(1))
      .subscribe(
        (userExist) => {
          
          if (userExist) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.alertService.error(`User doesn't exist`);
          }
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
  openRegister() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(RegisterComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
  closeWindow() {
    if (this.loginForm.invalid) {
      return;
    }
    setTimeout(() => {
    this.dialog.closeAll();
  },1500);
  }
}

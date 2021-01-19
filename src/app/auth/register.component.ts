import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { AccountService, AlertService } from '../services';

@Component({ templateUrl: 'register.component.html', 
              styleUrls: ['register.component.scss'], 
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        public dialog: MatDialog,
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['../home']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName:['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get controls() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    closeWindow() {
        if (this.form.invalid) {
            
            return;
          }
          setTimeout(() => {
            this.dialog.closeAll()
          },1500);
        
    }
    closeModal() {
        this.dialog.closeAll()
    }
}

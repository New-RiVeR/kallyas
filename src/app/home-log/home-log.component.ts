import { Component } from '@angular/core';

import { User } from '../models';
import { AccountService } from '../services';

@Component({ templateUrl: 'home-log.component.html' })
export class HomeLogComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class AccountService {
    users: User[];
    userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    // login(loggedUser) {
    //     return this.getAll()
    //     .pipe()
    //     .subscribe(users => {
    //         const userExist = users.some(user => user.email === loggedUser.email && user.password === loggedUser.password);
    //         console.log('userExist: ', userExist);
    //     });
    // }

    login(loggedUser) {
        
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
            .pipe(map(users => {
                const existedUser = users.find(user => user.email === loggedUser.email && user.password === loggedUser.password);
                if (existedUser) {
                    localStorage.setItem('user', JSON.stringify(existedUser));
                    this.userSubject.next(loggedUser);
                    return true;
                }
                return false;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['../home']);
    }

    register(user: User): Observable<User> {
       
        return this.http.post<User>(`${environment.apiUrl}/users`, user);
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string): Observable<User>{
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: User): Observable<User>{
        return this.http.put<User>(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                if (id == this.userValue.id) {
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string): Observable<{}> {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
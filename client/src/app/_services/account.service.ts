import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, map } from "rxjs";
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class AccountService{
    baseUrl = environment.baseUrl;
    private currentUserSource = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSource;

    private http: HttpClient;

    constructor(http: HttpClient){
        this.http = http
    }

    loginUser(model: any){
        return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
            map((response) => {
                const user = response;
                if(user){
                    localStorage.setItem('user', JSON.stringify(response));
                    this.setCurrentUser(user);
                }
            })
        )
    }

    registerUser(model: any){
        return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
            map((response) => {
                const user = response;
                if(!localStorage.getItem('user')){
                    localStorage.setItem('user', JSON.stringify(response));
                    this.setCurrentUser(user);
                }
                return user;
            })
        )
    }

    setCurrentUser(user: User){
        this.currentUserSource.next(user);
    }

    logoutUser(){
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }
}
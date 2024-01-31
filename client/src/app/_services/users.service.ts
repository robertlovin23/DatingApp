import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { UserList } from '../models/userList';

@Injectable()
export class UsersService{
    users: UserList[] = [];
    private http: HttpClient;
    usersChanged = new Subject<UserList[]>();

    constructor(http: HttpClient){
        this.http = http
    }


    grabUsers(){
        this.http.get<UserList[]>('http://localhost:5104/api/users').subscribe({
            next: (response) => {
                this.users = response
                this.usersChanged.next(this.users);
            },
            error: (err) => {
                console.log(err)
            },
            complete: () => {
                console.log(this.users)
    
            }
        })
    }
      // Observable to subscribe to changes in the users array
  getUsersChangedObservable(): Observable<UserList[]> {
    return this.usersChanged.asObservable();
  }
}
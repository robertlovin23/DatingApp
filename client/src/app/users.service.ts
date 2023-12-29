import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

interface User{
    id: number;
    name: string;
}

@Injectable()
export class UsersService{
    users: User[] = [];
    private http: HttpClient;
    usersChanged = new Subject<User[]>();

    constructor(http: HttpClient){
        this.http = http
    }


    grabUsers(){
        this.http.get<User[]>('http://localhost:5104/api/users').subscribe({
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
  getUsersChangedObservable(): Observable<User[]> {
    return this.usersChanged.asObservable();
  }
}
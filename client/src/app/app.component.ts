import { Component, OnInit, Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

interface User{
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  users: any = [];
  subscription: Subscription;
  userService: UsersService;

  constructor(userService: UsersService){
    this.userService = userService;
  }

  ngOnInit(){
    this.subscription = this.userService.getUsersChangedObservable().subscribe((users) => {
       this.users = users;
    });
    this.userService.grabUsers();
  }

}

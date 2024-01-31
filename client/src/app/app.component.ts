import { Component, OnInit, Injectable } from '@angular/core';
import { UsersService } from './_services/users.service';
import { Subscription } from 'rxjs';
import { AccountService } from './_services/account.service';
import { User } from './models/user';
import { UserList } from './models/userList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  subscription: Subscription;
  userService: UsersService;
  accountService: AccountService;

  constructor(userService: UsersService, accountService: AccountService){
    this.userService = userService;
    this.accountService = accountService;
  }

  ngOnInit(){
      this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    console.log(user)
    this.accountService.setCurrentUser(user);
  }

}

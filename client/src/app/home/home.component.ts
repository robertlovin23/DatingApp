import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { UserList } from '../models/userList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: UserList[] = [];
  usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  ngOnInit(){
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  grabUsers(){
    this.usersService.getUsersChangedObservable().subscribe((users: UserList[]) => {
      this.users = users;
    });
    this.usersService.grabUsers();
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}

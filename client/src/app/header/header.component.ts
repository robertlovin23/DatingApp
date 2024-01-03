import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { AccountService } from '../account.service';
import { User } from '../models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public accountService: AccountService;
  model: User = {username:'',password: ''};
  subscription: Subscription;
  loggedIn = false;
  currentUser$: Observable<User | null> = of(null);

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  ngOnInit(){
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    console.log(this.model)
    return this.subscription = this.accountService.loginUser(this.model).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (err: any) => {
        console.log(err)
      }
   });
  }

  logout(){
    this.accountService.logoutUser();
   }
}

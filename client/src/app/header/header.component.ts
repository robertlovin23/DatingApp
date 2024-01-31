import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public accountService: AccountService;
  model: User = {username:'',password: ''};
  subscription: Subscription;
  private router: Router;
  toastr: ToastrService;
  loggedIn = false;
  currentUser$: Observable<User | null> = of(null);

  constructor(accountService: AccountService, router: Router, toastr: ToastrService) {
    this.accountService = accountService;
    this.router = router;
    this.toastr = toastr;
  }

  ngOnInit(){
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    console.log(this.model)
    return this.subscription = this.accountService.loginUser(this.model).subscribe({
      next: (response: any) => {
        console.log(response)
        this.router.navigateByUrl("/members")
      }
   });
  }

  logout(){
    this.accountService.logoutUser();
    this.router.navigateByUrl("/")
   }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegisterOutput = new EventEmitter();
  model: any = {};
  accountService: AccountService;

  constructor(accountService: AccountService) {
      this.accountService = accountService;
  }

  register(){
    console.log(this.model)
    return this.accountService.registerUser(this.model).subscribe({
      next: (response: any) => {
        console.log(response)
        this.cancelRegister()
      },
      error: (err: any) => {
        console.log(err)
      }
   });
  }

  cancelRegister(){
    console.log('cancelled');
    this.cancelRegisterOutput.emit(false);
  }

}

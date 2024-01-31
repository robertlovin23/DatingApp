import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegisterOutput = new EventEmitter();
  model: any = {};
  toastr: ToastrService;
  accountService: AccountService;

  constructor(accountService: AccountService, toastr: ToastrService) {
      this.accountService = accountService;
      this.toastr = toastr;
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
        if(!this.model.username){
          this.toastr.error(err.error.errors.Username[0])
        } else if (!this.model.password){
          this.toastr.error(err.error.errors.Password[0])
        } else {
          this.toastr.error(err.error)
        }
      }
   });
  }

  cancelRegister(){
    console.log('cancelled');
    this.cancelRegisterOutput.emit(false);
  }

}

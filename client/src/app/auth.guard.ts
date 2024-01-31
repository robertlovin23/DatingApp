import { CanActivateFn } from '@angular/router';
import { AccountService } from './_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from './models/user';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountSrvice = inject(AccountService);
  const toastr = inject(ToastrService);


  return accountSrvice.currentUser$.pipe(
    map((user: any) => {
      if(user){
        return true;
      } else {
       toastr.error('you shall not pass!');
       return false;
      }
    })
  )
};

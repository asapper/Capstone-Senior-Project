import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/authentication.service';


@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    //return true;
    
  	if(this.authService.checkCredentials()){
      if(this.authService.isLoggedIn()){
        if(!this.authService.isUnassigned()){
          return true;
        }
        else{
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
  	}
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(){
    return this.canActivate(); 
  }
}
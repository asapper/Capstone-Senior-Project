import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
  	if(this.authService.checkCredentials()){
  		return true;
  	}
  	else{
  		this.router.navigate(['/login']);
  		return false;
  	}
  }

  canActivateChild(){
    return this.canActivate();
  }
}
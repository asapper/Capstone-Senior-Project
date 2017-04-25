import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/authentication.service';

@Injectable()
export class AdminRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
  	if(this.authService.checkCredentials()){
  		if(this.authService.isLoggedIn()){
        if(this.authService.checkAdmin()){
          return true;
        }
        else{
          this.router.navigate(['/home/unauthorized']);
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
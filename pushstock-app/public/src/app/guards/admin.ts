/*
 * File:          admin.ts
 * Description:    Defines the route-guards for admin only routes
 *
 * Edit history:
 *
 * Editor      Date        Description
 * =====      ========    ===========
 * Ragnell    04/18/17    Created route guard
 * Ragnell    04/27/17    Added use of angular2-jwt check of token expiration
 */
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
/*
 * File:          login.ts
 * Description:    Defines the route-guards for all routes rooted from 'home'
 *
 * Edit history:
 *
 * Editor      Date        Description
 * =====      ========    ===========
 * Ragnell    04/10/17    Created route guard
 * Ragnell    04/27/17    Added use of angular2-jwt check of token expiration
 */
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
        }
      }
      else{
        console.log("Whoops!");
        this.router.navigate(['/login']);
      }
  	}
    else{
      console.log("Whoops!");
      this.router.navigate(['/login']);
    }
    
    return false;
  }

  canActivateChild(){
    return this.canActivate(); 
  }
}
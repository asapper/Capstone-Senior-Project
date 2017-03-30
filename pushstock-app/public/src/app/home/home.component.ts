import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html'
})
 
export class HomeComponent {
 
    constructor(
        private authenticationService:AuthenticationService, private router:Router){}
 
    ngOnInit(){
        this.authenticationService.checkCredentials();
    }
 
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
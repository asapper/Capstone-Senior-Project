import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html'
})
 
export class HomeComponent {

    admin: boolean = false;
 
    constructor(private authenticationService:AuthenticationService, private router:Router){
        if(localStorage.getItem('role') === 'Admin'){
            this.admin = true;
        }
    }
 
    ngOnInit(){
        //this.authenticationService.checkCredentials();
        if(localStorage.getItem('role') === 'Admin'){
            this.admin = true;
        }
    }
 
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
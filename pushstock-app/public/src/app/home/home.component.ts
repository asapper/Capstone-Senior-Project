import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html'
})
 
export class HomeComponent {

    admin: boolean;
 
    constructor(private authenticationService:AuthService, private router:Router){}
 
    ngOnInit(){
        this.admin = this.authenticationService.checkAdmin();
        console.log("Is Admin? " + this.authenticationService.checkAdmin());
    }
 
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
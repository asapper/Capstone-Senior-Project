import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-root',
    templateUrl: 'unauthorized.component.html'
})
 
export class UnauthorizedComponent {

    unassigned: boolean;
    admin: boolean;
 
    constructor(private authenticationService:AuthService, private router:Router){}
 
    ngOnInit(){
        this.unassigned = this.authenticationService.isUnassigned();
        this.admin = this.authenticationService.checkAdmin();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
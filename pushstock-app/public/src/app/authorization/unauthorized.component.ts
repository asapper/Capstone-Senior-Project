import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-root',
    templateUrl: 'unauthorized.component.html'
})
 
export class UnauthorizedComponent {

    admin: boolean = false;
 
    constructor(private authenticationService:AuthService, private router:Router){}
 
    ngOnInit(){
    }
}
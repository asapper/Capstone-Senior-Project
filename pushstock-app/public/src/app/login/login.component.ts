import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    error = '';
        
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //if(!this.authenticationService.checkCredentials()){
            this.authenticationService.logout();
        //}
        //else{
            //this.router.navigate(this.route.snapshot.queryParams['returnUrl']);
        //}

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error =>{
                    this.error = 'Email or password is incorrect';
                    this.loading = false;
                }
            );
    }
}
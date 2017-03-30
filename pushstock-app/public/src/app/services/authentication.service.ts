import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

var users = [
    new User('user', 'pass'),
    new User('admin@admin.com','adm9'),
    new User('user1@gmail.com','a23')
];

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private _router: Router) { }

    checkCredentials() {
        if (localStorage.getItem('currentUser') === null){
            this._router.navigate['login'];
            return false;
        }
        return true;
    } 

    login(username: string, password: string) {
        if(username == 'user' && password == 'pass'){
            const newUser = new User(username, password);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
        }
        /*
        return this.http.post('https://localhost:4200' + '/auth/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._router.navigate(['/login']);
    }

    
}

    
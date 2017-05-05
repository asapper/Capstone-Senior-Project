import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthConfig, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { ApiSettings } from '../services/api-settings';
import 'rxjs/add/operator/map';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

@Injectable()
export class AuthService {
    jwtHelper: JwtHelper = new JwtHelper();
    auth: String;
    constructor(private http: Http, private _router: Router) { 
        this.auth = ApiSettings.Auth;
    }

    checkCredentials() {
        if (localStorage.getItem('token') === null){
            return false;
        }
        else{
            return true;
        }
    } 

    isLoggedIn(){
        console.log(this.jwtHelper.decodeToken(localStorage.getItem('token')));
        console.log(tokenNotExpired('token', localStorage.getItem('token')));
        return tokenNotExpired(null , localStorage.getItem('token'));
    }

    checkAdmin() {
        if(this.checkCredentials()){
            let token = localStorage.getItem('token');
            let decoded = this.jwtHelper.decodeToken(token);
            if(decoded.role === 'Admin'){
                return true;
            }
        }
        return false;
    }

    isUnassigned(){
        if(this.checkCredentials()){
            let token = localStorage.getItem('token');
            let decoded = this.jwtHelper.decodeToken(token);
            if(decoded.role === 'Unassigned'){
                return true;
            }
            else{
                return false;
            }
        }
        return true;
    }

    login(username: string, password: string) {
        return this.http.post(this.auth + '/login', { email: username, password: password })
            .map((response: Response) => {
                if(response.status === 401){
                    return false;
                }
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                console.log(token);
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);
                    return true;
                }
                else{
                    return false;
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }

    
}

    

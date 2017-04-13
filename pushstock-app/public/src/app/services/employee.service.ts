/*
 * File:
 * Description:
 *
 * Edit history:
 *
 * Editor		Date		Description
 * ======		========	===========
 * Rapp			03/29/17	File created
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ApiSettings } from './api-settings';

@Injectable()
export class EmployeeService {
	api: String;
	auth: String;
	constructor(private http: Http) {
		this.api = ApiSettings.API;
		this.auth = ApiSettings.Auth;
	}

	// Return all employees in the database
	getAllEmployees() {
		return this.http.get(`${this.api}/employees`)
			.map(res => res.json());
	}

	// Delete all employees from the database
	deleteAllEmployees() {
		this.http.delete(`${this.api}/employees`);
	}

	// Delete an employee from the database
	deleteEmployee(email: String) {
		return this.http.delete(`${this.api}/employees/${email}`)
			.map(res => res.json());
	}

    // Add a new employee with all fields to the database
    addEmployee(email: String, password: String, firstName: String, lastName: String, role: String) {
        return this.http.post(`${this.api}/addEmployee`, { email, password, firstName, lastName, role })
            .map(res => res.json());
    }

    registerEmployee(email: String, password: String, firstName: String, lastName: String, role: String){
    	return this.http.post(`${this.auth}/register`, { email, password, firstName, lastName, role })
    		.map(res => res.json())
    		.catch(this.handleRegisterError);
    }

    handleRegisterError(error: Response | any){
    	// In a real world app, you might use a remote logging infrastructure
		let loggedErrMsg: string;
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			loggedErrMsg = `${error.status} - ${error.statusText || ''} ${err}`;
			errMsg = `${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(loggedErrMsg);
		return Observable.throw(errMsg);
	}
}

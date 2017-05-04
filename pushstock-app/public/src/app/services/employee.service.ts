/*
 * File:
 * Description:
 *
 * Edit history:
 *
 * Editor		Date		Description
 * ======		========	===========
 * Rapp			03/29/17	File created
 * Saul			04/18/17	UpdateEmployee service added
 * Saul			04/27/17    Delete tasks associated with an employee
 * Rapp         05/04/17    Changed ApiSettings.Auth to ApiSettings.AUTH
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

import { ApiSettings } from './api-settings';

@Injectable()
export class EmployeeService {
	api: String;
	auth: String;
	constructor(private http: Http, private authHttp: AuthHttp) {
		this.api = ApiSettings.API;
		this.auth = ApiSettings.AUTH;
	}

	// Return all employees in the database
	getAllEmployees() {
		return this.authHttp.get(`${this.api}/employees`)
			.map(res => res.json());
	}

	getEmployee(email: string) {
        return this.authHttp.get(`${this.api}/employees/${email}`)
        .map(res => res.json());
    }

	// Delete all employees from the database
	deleteAllEmployees() {
		this.authHttp.delete(`${this.api}/employees`);
	}

	// Delete an employee from the database
	deleteEmployee(email: String) {
		return this.authHttp.delete(`${this.api}/employees/${email}`)
			.map(res => res.json());
	}

    // Add a new employee with all fields to the database
    addEmployee(email: String, password: String, firstName: String, lastName: String, role: String) {
        return this.authHttp.post(`${this.api}/addEmployee`, { email, password, firstName, lastName, role })
        .map(res => res.json());
    }

	// Update the information of an employee
	updateEmployee(oEmail: String, email: String, firstName: String, lastName: String, role: String) {
		return this.authHttp.put(`${this.api}/employees/${oEmail}`, { oEmail, email, firstName, lastName, role })
		.map(res => res.json());
	}

	// Returns true if a employee has oopen tasks
	hasTasks(_id){
		return this.authHttp.get(`${this.api}/hasTask/${_id}`)
			.map( res => res.json());
	}

	// Deletes tasks assigned employee with id _id
	deleteCompletedTasks(_id){
		return this.authHttp.delete(`${this.api}/deleteCompletedTasks/${_id}`)
			.map( res => res.json());
	}

	registerEmployee(email: String, password: String, firstName: String, lastName: String, role: String){
    	return this.authHttp.post(`${this.auth}/register`, { email, password, firstName, lastName, role })
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

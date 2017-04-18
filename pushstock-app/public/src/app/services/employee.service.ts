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
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class EmployeeService {
	api: String;
	constructor(private http: Http) {
		this.api = ApiSettings.API;
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

	// Update the information of an employee
	updateEmployee(oEmail: String, email: String, firstName: String, lastName: String, role: String) {
			return this.http.put(`${this.api}/employees/${oEmail}`, { oEmail, email, firstName, lastName, role })
			.map(res => res.json());
	}
}

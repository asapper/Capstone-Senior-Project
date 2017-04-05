/*
 * File:					button.service.ts
 * Description:		The service that provides button info exposed by the API.
 *
 * Edit history:
 *
 * Editor				Date				Description
 * ======				========		===========
 * Rapp					03/28/17		File created
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class ButtonService {
	api: String;
    constructor(
        private http: Http
    ) {
		this.api = ApiSettings.API;
	}

	// Get the information for a specific button
	getButton(macAddr: String) {
		return this.http.get(`${this.api}/buttons/${macAddr}`)
        .map(res => res.json());
	}
	
	// Function that returns all buttons from the API
	getAllButtons() {
		return this.http.get(`${this.api}/buttons`)
        .map(res => res.json());
	}

    // Returns all assigned buttons
    getAssignedButtons() {
        return this.http.get(`${this.api}/assignedbuttons`)
        .map(res => res.json());
    }

    // Returns all unassigned buttons
    getUnassignedButtons() {
        return this.http.get(`${this.api}/unassignedbuttons`)
        .map(res => res.json());
    }

    // Update (i.e., assign) button
    assignButton(macAddr: String, description: String) {
        return this.http.put(`${this.api}/assignbutton`, { macAddr, description })
        .map(res => res.json());
    }

    // Update (i.e., unassign) button
    unassignButton(macAddr: String) {
        return this.http.put(`${this.api}/unassignbutton`, { macAddr })
        .map(res => res.json());
    }

	// Update the information for a button
	updateButton(macAddr: String, description: String) {
		return this.http.put(`${this.api}/buttons/${macAddr}`, { description })
        .map(res => res.json());
	}

	// Deletes a button based on its mac address
	deleteButton(macAddr: String) {
		return this.http.delete(`${this.api}/buttons/${macAddr}`)
        .map(res => res.json());
	}

	// Adds a button to the database
	addButton(macAddr: String, description: String) {
		return this.http.post(`${this.api}/addButton`, { macAddr, description })
        .map(res => res.json());
	}
		
}

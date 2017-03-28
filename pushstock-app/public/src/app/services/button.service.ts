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
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class ButtonService {
	// API path
	//api = ApiSettings.API;

	//api: String = ApiSettings.API;

	api: String;

	constructor(private http: Http) {
		//apiSuffix: String = 'buttons';
		//fullApiPath: String = ApiSettings.API + '/buttons';

		this.api = ApiSettings.API;
	}

	// Function that returns all buttons from the API
	getAllButtons() {
		/*
		 * TODO change code from component
		 */
		/*
		this.http.get(`${this.fullApiPath}`)
			.map(res => res.json())
			.subscribe(buttons => {
				//console.log(buttons);
				this.buttonsList = buttons;
			})
			*/

		//return this.http.get(`${this.fullApiPath}`)
		return this.http.get(`${this.api}/buttons`)
			.map(res => res.json());
	}

	// Deletes a button based on its mac address
	deleteButton(macAddr: String) {
		/*
		 * TODO change code from component
		 */

		/*
		this.http.delete(`${this.fullApiPath}/${macAddr}`)
			.map(res => res.json())
			.subscribe(buttons => {
				console.log(buttons);
				this.buttonList = buttons;
			}

			 // this shouldn't be done here; write a wrapper in the component that
			 // calls deleteButton and then getAllButtons
			console.log('deleting button: ' + macAddr);
			this.getAllButtons;
			*/

		 // TODO get back error message from api and display to user
		 //this.http.delete(`${this.fullApiPath}/${macAddr}`);
		return this.http.delete(`${this.api}/buttons/${macAddr}`)
			.map(res => res.json());
	}

	// Adds a button to the database
	addButton(macAddr: String, description: String) {
		return this.http.post(`${this.api}/addButton`, { macAddr, description })
			.map(res => res.json());
	}
		
}

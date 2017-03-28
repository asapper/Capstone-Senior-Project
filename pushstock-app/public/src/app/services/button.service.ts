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

@Injectable()
export class ButtonService {
	// API path
	api = 'https://localhost:4200/api';

	// Function that returns all buttons from the API
	getAllButtons(): any[] {
		/*
		 * TODO change code from component
		 */
		this.http.get(`${this.api}/buttons`)
			.map(res => res.json())
			.subscribe(buttons => {
				console.log(buttons);
				this.buttonsList = buttons;
			})
	}

	deleteButton(macAddr: String): void {
		/*
		 * TODO change code from component
		 */
		this.http.delete(`${this.api}/buttons/${macAddr}`)
			.map(res => res.json())
			.subscribe(buttons => {
				console.log(buttons);
				this.buttonList = buttons;
			}

			/* 
			 * this shouldn't be done here; write a wrapper in the component that
			 * calls deleteButton and then getAllButtons
			 */
			console.log('deleting button: ' + macAddr);
			this.getAllButtons;
	}
}

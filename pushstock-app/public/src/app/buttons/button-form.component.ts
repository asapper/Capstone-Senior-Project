/*
* File:	     button-form.component.ts
* Author:	   Brennan Saul
* Description:A component where one enters the information
*
* Edit history:
*
* Editor	        Date                Description
* ======	        ========        ===========
* Saul	        03/16/17      Updated
* Saul	    03/21/17    Self Contained. Does not use root component
* Rapp			03/28/17		Refactored API calls into ButtonService
*/

import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { Button } from '../shared/models/button';
import { ButtonService } from '../services/button.service';

@Component ({
    selector: 'button-form',
    templateUrl: './button-form.component.html',
	providers: [ButtonService]
})

export class ButtonFormComponent {
    constructor(
        private location: Location,
        private buttonService: ButtonService,
        private alertService: AlertService
    ) {}

    // Class used to group data added to mongoDb
    newButton: Button = new Button();

    // Add a new button to the database
	addButton(macAddr: String, description: String): void {
		// Call API to add button to database
		this.buttonService.addButton(macAddr, description).subscribe();
        // alert button has been assigned
        let alert = new Alert(); 
        alert.message = "A new button has been created";
        alert.type = "alert-success"; 
        this.alertService.setButtonAlert(alert);
	}
}

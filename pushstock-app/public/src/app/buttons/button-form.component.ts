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

import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/models/button';
import { Http } from '@angular/http';
import { Location } from '@angular/common';

import { ButtonService } from '../services/button.service';

@Component ({
    selector: 'button-form',
    templateUrl: './button-form.component.html',
	providers: [
		ButtonService
	]
})

export class ButtonFormComponent {
    // For output
    @Output() buttonCreated = new EventEmitter();


    // Does anyone know what this does?
    constructor(
        private http: Http,
        private location: Location,
				private buttonService: ButtonService
    ) {}

    // Class used to group data added to mongoDb
    newButton: Button = new Button();

    active: boolean = true;


	addButton(macAddr: String, description: String): void {
		// Call API to add button to database
		this.buttonService.addButton(macAddr, description)
			.subscribe(buttons => {
				console.log(buttons);
			});

		// Emits event so that the table will know to update
		this.buttonCreated.emit();
		console.log('button added: ' + this.newButton);

		// Clear the form after submitted
		this.newButton = new Button();
		this.active = false;
		setTimeout(() => this.active = true, 0);
	}

    goBack(): void {
        this.location.back();
    }
}

/*
* File:	         button-table.component.ts
* Author:	       Brennan Saul
* Description:	A component that displays all of the buttons in the DB
*
* Edit history:
*
* Editor	Date            Description
* ======	========		===========
* Saul      03/15/17		File created
* Saul      03/21/17        Calls API instead of relying on AppComponent
* Saul      03/21/17        Self contained & calls the ButtonFormComponent
* Saul      03/27/17        deleteButton() added
* Rapp			03/28/17				Refactored API calls into ButtonService
*/


import { Component } from '@angular/core';
//import { Http } from '@angular/http';
import { OnInit } from '@angular/core';

import { ButtonService } from '../services/button.service';

@Component ({
	selector: 'button-table',
	templateUrl: './button-table.component.html',
	providers: [ButtonService]
})

export class ButtonTableComponent {
	buttonList: any[];
    private showOnlyActiveButtons: boolean;
    private allButtons: any[];

    constructor(private buttonService: ButtonService) {
		this.buttonList = [];
        this.allButtons = [];
	}

    // Angular 2 Life Cycle event whem component has been initialized
    // Get the array of buttons when the component is initialized
    ngOnInit() {
        this.getAllButtons();
        this.showOnlyActiveButtons = true;
    }

	// Send request to get list of all buttons in the database
	getAllButtons(): void {
		// Call the API and store returned list of buttons in the array
		this.buttonService.getAllButtons()
			.subscribe(buttons => {
				this.buttonList = buttons;
                this.allButtons = buttons;
                this.filterButtons();
			});
	}

    filterButtons(): void {
        this.buttonList = this.allButtons;
        if (this.showOnlyActiveButtons) {
            this.buttonList = this.buttonList.filter(
                button => button.isActive === true);
        }
        this.showOnlyActiveButtons = !this.showOnlyActiveButtons;
    }

	// Send request to delete button from the database
	deleteButton(macAddr: String): void {
		this.buttonService.deleteButton(macAddr)
			.subscribe(buttons => {
				console.log(buttons);
				//this.buttonList = buttons;
			});

		console.log('Deleted button: ' + macAddr);
		this.getAllButtons();
	}


	// NOT BEING USED RIGHT NOW //

	// Send request to delete a button and then get an updated list
	// of all buttons
	deleteButtonAndUpdate(macAddr: String): void {
		// Send delete request to API
		this.deleteButton(macAddr);

		// Update local list of buttons
		this.getAllButtons();
	}
}

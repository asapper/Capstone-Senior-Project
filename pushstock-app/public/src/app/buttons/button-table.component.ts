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
* rapp		03/28/17        Refactored API calls into ButtonService
*/


import { Component, OnInit } from '@angular/core';

import { ButtonService } from '../services/button.service';

@Component ({
	selector: 'button-table',
	templateUrl: './button-table.component.html',
	providers: [ButtonService]
})

export class ButtonTableComponent implements OnInit {
	buttonList: any[];
    allButtons: any[];
    private showOnlyActiveButtons: boolean;

    constructor(private buttonService: ButtonService) {
		this.buttonList = [];
        this.allButtons = [];
	}

    // Angular 2 Life Cycle event whem component has been initialized
    // Get the array of buttons when the component is initialized
    ngOnInit(): void {
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
                this.showOnlyActiveButtons = true;
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
		this.buttonService.deleteButton(macAddr).subscribe();
        this.getAllButtons();
		console.log('Deleted button: ' + macAddr);
	}
}

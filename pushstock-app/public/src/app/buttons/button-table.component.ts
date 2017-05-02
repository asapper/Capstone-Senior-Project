/*
* File:	        button-table.component.ts
* Author:	    Brennan Saul
* Description:	A component that displays all of the buttons in the DB
*
* Edit history:
*
* Editor	Date        Description
* ======	========	===========
* Saul      03/15/17	File created
* Saul      03/21/17    Calls API instead of relying on AppComponent
* Saul      03/21/17    Self contained & calls the ButtonFormComponent
* Saul      03/27/17    DeleteButton() added
* Rapp		03/28/17    Refactored API calls into ButtonService
* Saul		04/12/17	Delete button and Edit buttton alerts report errors
*						and success
* Rapp      04/30/17    Showing active/inactive/all buttons now looks the same as
*                       show open/completed/all tasks
*/

import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';
import { ButtonService } from '../services/button.service';
import { Alert } from '../shared/models/alert';

@Component ({
	selector: 'button-table',
	templateUrl: './button-table.component.html',
	providers: [ButtonService]
})

export class ButtonTableComponent implements OnInit {
	buttonList: any[];
    allButtons: any[];
    alertType: string;
    alertTitle: string;
    alertMessage: string;
    modalMacAddr: string;
    private showOnlyActiveButtons: boolean;

    // booleans used for filtering
    all: boolean = false;
    active: boolean = true;

    constructor(
        private alertService: AlertService,
        private buttonService: ButtonService
    ) {
        // init variables
		this.buttonList = [];
        this.allButtons = [];
        this.alertType = "";
        this.alertTitle = "";
        this.alertMessage = "";
        this.modalMacAddr = "";
	}

    // Angular 2 Life Cycle event whem component has been initialized
    // Get the array of buttons when the component is initialized
    ngOnInit(): void {
        this.retrieveLatestAlert();
        this.getAllButtons();
        //this.showOnlyActiveButtons = true;
    }

    private retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
    }

    private filterButtons(): void {
        this.buttonList = this.allButtons;
        if (!this.all) {
            if (this.active) {
                this.buttonList = this.buttonList.filter(
                    button => button.isActive === true
                );
            } else {
                this.buttonList = this.buttonList.filter(
                    button => button.isActive === false
                );
            }
        }
        /*
        if (this.showOnlyActiveButtons) {
            this.buttonList = this.buttonList.filter(
                button => button.isActive === true);
        }
        this.showOnlyActiveButtons = !this.showOnlyActiveButtons;
        */
    }

    // Filter list to show only active buttons
    private filterActive() {
        this.active = true;
        this.all = false;
        this.filterButtons();
    }

    // Filter list to show only inactive buttons
    private filterInactive() {
        this.active = false;
        this.all = false;
        this.filterButtons();
    }

    // Filter list to show all buttons
    private filterAll() {
        this.all = true;
        this.filterButtons();
    }

    setMacAddrToDelete(macAddr: string): void {
        this.modalMacAddr = macAddr;
    }

	// Send request to get list of all buttons in the database
	getAllButtons(): void {
		// Call the API and store returned list of buttons in the array
        this.buttonService.getAllButtons().subscribe(buttons => {
            this.buttonList = buttons;
            this.allButtons = buttons;
            this.showOnlyActiveButtons = true;
            this.filterButtons();
        });
	}

	// Send request to delete button from the database
	deleteButton(macAddr: String): void {
        // delete button through service
        this.buttonService.deleteButton(macAddr).subscribe(res => {
            this.alertService.handleApiResponse(res);
			this.retrieveLatestAlert();
			this.getAllButtons();
		});
	}
}

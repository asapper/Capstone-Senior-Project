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
        this.showOnlyActiveButtons = true;
    }

    setMacAddrToDelete(macAddr: string): void {
        this.modalMacAddr = macAddr;
    }

    retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestButtonAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
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
        // delete button through service
		this.buttonService.deleteButton(macAddr).subscribe();
        // alert button has been unassigned
        let alert = new Alert();
        alert.message = "Button with MAC address " + macAddr + " has been deleted.";
        alert.type = "alert-info";
        this.alertService.setButtonAlert(alert);
        // update alerts in list of buttons in this view
        this.retrieveLatestAlert();
		this.getAllButtons();
	}
}

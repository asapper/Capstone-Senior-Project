/*
* File:	       button-table.component.ts
* Author:	     Brennan Saul
* Description:	A component that displays all of the buttons in the DB
*
* Edit history:
*
* Editor	          Date                Description
* ======	          ========        ===========
* Saul	          03/15/17      File created
* Saul	      03/21/17    Calls API instead of relying on AppComponent
* Saul	      03/21/17    Self contained & calls the ButtonFormComponent
*/


import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component ({
	selector: 'button-table',
	templateUrl: './button-table.component.html'
})

export class ButtonTableComponent {
	constructor(private http: Http) {}

	// API path
	API = 'https://localhost:4200/api';

	buttonList: any[];

	// Boolean flag that controls if the buttonform is displayed
	addButtonActive: boolean = false;
	// Control if button assign form is displayed
	assignButtonActive: boolean = false;

	// Angular 2 Life Cycle event whem component has been initialized
	// Get the array of buttons when the component is initialized
	ngOnInit() {
	    this.getAllButtons();
	}

	// Function that returns all buttons from the API
	getAllButtons() {
	    this.http.get(`${this.API}/buttons`)
	        .map(res => res.json())
	        .subscribe(buttons => {
	            console.log(buttons);
	            this.buttonList = buttons;
	        })
	}

	setAddButtonTrue() {
        this.assignButtonActive = false;
        this.addButtonActive = true;
	}

    setAssignButtonTrue() {
        this.addButtonActive = false;
        this.assignButtonActive = true;
    }
}

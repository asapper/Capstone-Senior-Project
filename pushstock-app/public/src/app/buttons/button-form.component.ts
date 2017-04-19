/*
* File:	     button-form.component.ts
* Author:	   Brennan Saul
* Description:A component where one enters the information
*
* Edit history:
*
* Editor	        Date                Description
* ======	        ========        ===========
* Saul	        03/16/17           Updated
* Saul	        03/21/17           Self Contained. Does not use root component
* Rapp			    03/28/17		       Refactored API calls into ButtonService
* Saul          04/6/17            alerts now depend on the successfulness
*                                  of the operation
* Saul          04/12/17           Alerts report error and success
* Saul          04/12/17           Smart alerts bug fixed
*/

import { Component } from '@angular/core';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { Button } from '../shared/models/button';
import { ButtonService } from '../services/button.service';
import { Location } from '@angular/common';

@Component ({
    selector: 'button-form',
    templateUrl: './button-form.component.html',
	providers: [ButtonService]
})

export class ButtonFormComponent {
   message: String;
    constructor(
        private buttonService: ButtonService,
        private alertService: AlertService,
        private location: Location
    ) {}

    // Class used to group data added to mongoDb
    newButton: Button = new Button();

  // Add a new button to the database
	addButton(macAddr: String, description: String): void {
    // Call API to add button to database
    this.buttonService.addButton(macAddr, description).subscribe( err => {
      let alert = new Alert();
      if (err) {
          //console.log(this.message);
          alert.title = "Failed: ";
          alert.message = err.message;
          alert.type = "alert-danger";

      } else {
          //console.log("successful add");
          alert.title = "Success: ";
          alert.message = "New button with MAC address " + this.newButton.macAddr + " has been created.";
          alert.type = "alert-success";
      }
      this.alertService.setAlert(alert);
      this.location.back(); // Route back to buttons table
    });
  }
}

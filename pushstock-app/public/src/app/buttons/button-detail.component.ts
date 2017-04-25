/*
 * File:        button-detail.component.ts
 * Author:      Andy Sapper
 * Description: Component for editing a button.
 *
 * Edit history:
 *
 * Editor   Date		Description
 * ======   ========	===========
 * Sapper   03/15/17	File created
 * Rapp		  03/28/17	Refactored API calls into the ButtonService
 * Saul     04/11/17  Alerts reprt error and success
 * Saul     04/12/17  Smart alerts bug fixed!
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { ButtonService } from '../services/button.service';

@Component({
    selector: 'button-detail',
    templateUrl: './button-detail.component.html',
	providers: [ButtonService]
})

export class ButtonDetailComponent implements OnInit {
    button: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private buttonService: ButtonService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        let macAddr = '';
        this.route.params.subscribe(params => {
            macAddr = params['macAddr'];
        });

        //get button through service
        this.buttonService.getButton(macAddr)
        .subscribe(button => {
            this.button = button;
        });
    }

    updateButton(description: String): void {
        // retrieve mac address from url
        let macAddr = '';
        this.route.params.subscribe(params => {
            macAddr = params['macAddr'];
        });
        // update button through service
		  this.buttonService.updateButton(macAddr, description).subscribe( err => {
        // Create new alert
        let alert = new Alert();
        // Button update failed
        if(err){
          alert.title = "Failed: ";
          alert.message = "Button Edit failed";
          alert.type = "alert-danger";
        }
        // Button update was successful
        else{
          alert.title = "Success!";
          alert.message = "Button with MAC address " + macAddr + " has been updated.";
          alert.type = "alert-success";
        }
        // Set the alert
        this.alertService.setAlert(alert);
        this.goBack();
      });
    }

    // Route back to buttons table
    goBack(): void {
        this.location.back();
    }
}

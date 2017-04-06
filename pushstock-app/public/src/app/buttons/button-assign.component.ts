/*
 * File: button-assign.component.ts
 * Author: Andy Sapper
 * Description: Component to assign buttons yet to be assigned.
 *
 * Edit history:
 *
 * Editor       Date        Description
 * =====        =====       =====
 * Sapper       03/28/17    File created
 */

import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { ButtonService } from '../services/button.service';

@Component({
    selector: 'button-assign',
    templateUrl: './button-assign.component.html',
    providers: [ButtonService]
})
export class ButtonAssignComponent implements OnInit {
    buttons: any[];
    newButton: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private buttonService: ButtonService,
        private alertService: AlertService
    ) {
        // init variables
        this.buttons = [];
        this.newButton = {};
    }

    ngOnInit(): void {
        this.buttonService.getUnassignedButtons()
        .subscribe(buttons => {
            this.buttons = buttons;
        });
    }

    goBack(): void {
        this.location.back();
    }

    assignButton(macAddr: String, description: String): void {
        // assign button through service
        this.buttonService.assignButton(macAddr, description)
        .subscribe();
        // alert button has been assigned
        let alert = new Alert();
        alert.title = "Success!"
        alert.message = "Button with MAC address " + macAddr + " has been assigned.";
        alert.type = "alert-success";
        this.alertService.setButtonAlert(alert);
    }
}

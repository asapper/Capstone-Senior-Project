/*
 * File: button-unassign.component.ts
 * Author: Andy Sapper
 * Description: Component to unassign buttons that have been assigned.
 *
 * Edit history:
 *
 * Editor       Date        Description
 * =====        =====       =====
 * Sapper       03/30/17    File created
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { ButtonService } from '../services/button.service';

@Component({
    selector: 'button-unassign',
    templateUrl: './button-unassign.component.html',
    providers: [ButtonService]
})
export class ButtonUnassignComponent implements OnInit {
    buttons: any[];
    oldButton: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private buttonService: ButtonService,
        private alertService: AlertService
    ) {
        this.buttons = [];
        this.oldButton = {};
    }

    ngOnInit(): void {
        this.buttonService.getAssignedButtons()
        .subscribe(buttons => {
            this.buttons = buttons;
        });
    }

    goBack(): void {
        this.location.back();
    }

    unassignButton(macAddr: String): void {
        // unassign button through service
        this.buttonService.unassignButton(macAddr)
        .subscribe();
        // alert button has been unassigned
        let alert = new Alert(); 
        alert.title = "Success!"
        alert.message = "Button with MAC address " + macAddr + " has been unassigned.";
        alert.type = "alert-success"; 
        this.alertService.setButtonAlert(alert);
    }
 }

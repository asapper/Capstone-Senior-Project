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
        private buttonService: ButtonService
    ) {
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
        this.buttonService.assignButton(macAddr, description)
        .subscribe();
    }
}

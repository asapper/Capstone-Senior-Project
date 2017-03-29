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
import { Http } from '@angular/http';

const BUTTONS = [
    { id: 1, macAddr: '123', description: 'asdf', isActive: false },
    { id: 2, macAddr: '234', description: 'jklm', isActive: false }
];


@Component({
    selector: 'button-assign',
    templateUrl: './button-assign.component.html'
})
export class ButtonAssignComponent implements OnInit {
    buttons: any[];
    newButton: any;

    // API path
    API = 'https://localhost:4200/api';

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http
    ) {}

    ngOnInit(): void {
        this.buttons = BUTTONS;
        this.newButton = {};
    }

    goBack(): void {
        this.location.back();
    }

    assignButton(macAddr: String, description: String): void {
        this.http.post(`${this.API}/assignbutton`, { macAddr, description })
            .map(res => res.json())
            .subscribe();
    }
}

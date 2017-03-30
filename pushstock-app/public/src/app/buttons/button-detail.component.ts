/*
 * File: button-detail.component.ts
 * Author: Andy Sapper
 * Description: Component for editing a button.
 *
 * Edit history:
 *
 * Editor       Date					Description
 * ======       ========				===========
 * Sapper       03/15/17				File created
 * Rapp			03/28/17				Refactored API calls into the ButtonService
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

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
        private buttonService: ButtonService
    ) {}

    ngOnInit(): void {
        let macAddr = '';
        this.route.params.subscribe(params => {
            macAddr = params['macAddr'];
        });

		this.buttonService.getButton(macAddr)
            .subscribe(button => {
                console.log(button);
                this.button = button;
            });
    }

    goBack(): void {
        this.location.back();
    }

    updateButton(description: String): void {
        let macAddr = '';
        this.route.params.subscribe(params => {
            macAddr = params['macAddr'];
        });

		this.buttonService.updateButton(macAddr, description)
            .subscribe();
    }
}

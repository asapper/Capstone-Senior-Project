/*
 * File: button-detail.component.ts
 * Author: Andy Sapper
 * Description: Component for editing a button.
 *
 * Edit history:
 *
 * Editor       Date           Description
 * ======       ========       ===========
 * Sapper       03/15/17       File created
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { Button } from '../shared/models/button';

const BUTTONS = [
    { id: 1, macAddr: '123', description: 'asdf', isActive: false },
    { id: 2, macAddr: '234', description: 'jklm', isActive: false }
];

@Component({
    selector: 'button-detail',
    templateUrl: './button-detail.component.html'
})
export class ButtonDetailComponent implements OnInit {
    button: any;

    // API path
    API = 'https://localhost:4200/api';

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http
    ) {}

    ngOnInit(): void {
        let macAddr = 0;
        this.route.params.subscribe(params => {
            macAddr = +params['macAddr'];
        });
        this.http.get(`${this.API}/buttons/${macAddr}`)
            .map(res => res.json())
            .subscribe(button => {
                console.log(button);
                this.button = button;
            });

        //this.route.params.subscribe(params => {
        //  this.button = BUTTONS.find(x => x.macAddr == params['macAddr']);
        //  });
    }

    goBack(): void {
        this.location.back();
    }

    updateButton(description: String): void {
        let macAddr = 0;
        this.route.params.subscribe(params => {
            macAddr = +params['macAddr'];
        });
        this.http.put(`${this.API}/buttons/${macAddr}`, { description })
            .map(res => res.json())
            .subscribe();
    }
}

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

@Component({
    selector: 'button-detail',
    templateUrl: './button-detail.component.html'
})
export class ButtonDetailComponent implements OnInit {
    button: Button;

    // API path
    API = 'https://localhost:4200/api';

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.http.get(`${this.API}/buttons/+params['id']`))
            .map(res => res.json())
            .subscribe(button => this.button = button);
    }

    goBack(): void {
        this.location.back();
    }

    updateButton(macAddr: String, description: String): void {
        this.route.params
            .switchMap((params: Params) => this.http.put(`${this.API}/buttons/+params['id']`, { macAddr, description })
            .map(res => res.json()));
    }
}

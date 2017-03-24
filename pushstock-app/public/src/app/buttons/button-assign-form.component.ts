/*
* File:         button-assign-form.component.ts
* Author:       Andy Sapper
* Description:  A component where one assigns a description to an unassigned button
*
* Edit history:
* Editor			Date			Description
* ======			========		===========
* Sapper			03/16/17		File created
*/

import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/models/button';
import { Http } from '@angular/http';
import { ButtonTableComponent } from './button-table.component';

@Component ({
  selector: 'button-assign-form',
  templateUrl: './button-assign-form.component.html',
  providers: [ButtonTableComponent]
})

export class ButtonAssignFormComponent {
  // For output
  @Output() buttonAssigneded = new EventEmitter();

  API = 'https://localhost:4200/api';

  // Get unassigned buttons
  unassignedButtons = ['11111', '2222', '33333', '44444'];

  // Does anyone know what this does?
  constructor(private http: Http, private table: ButtonTableComponent) {}

  active: boolean = true;

    onSubmit() {
        console.log("Assign form submitted!");
    }
}

/*
* File:         button-form.component.ts
* Author:       Brennan Saul
* Description:  A component where one enters the information
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/16/17		Updated
* Saul        03/21/17    Self Contained. Does not use root component
*/

import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/models/button';
import { Http } from '@angular/http';
import { ButtonTableComponent } from './button-table.component';

@Component ({
  selector: 'button-form',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './button-form.component.html',
    providers: [ButtonTableComponent]
})

export class ButtonFormComponent {
  // For output
  @Output() buttonCreated = new EventEmitter();

  API = 'https://localhost:4200/api';

  // Does anyone know what this does?
  constructor(private http: Http, private table: ButtonTableComponent) {}

  // Class used to group data added to mongoDb
  newButton: Button = new Button();

  active: boolean = true;


  addButton(macAddr: String, description: String){

    this.http.post(`${this.API}/addButton`, { macAddr, description })
    .map(res => res.json())
    .subscribe(buttons => {
        console.log(buttons);
        this.table.buttonList = buttons;
    })
    // emits event so that the table will know to update
    this.buttonCreated.emit();
    console.log("button added" + this.newButton);

    // clears the form everytime it is submitted
    this.newButton = new Button();

    // clears forms and states invaled and touched
    this.active = false;
    setTimeout(() => this.active = true, 0);

  }
}

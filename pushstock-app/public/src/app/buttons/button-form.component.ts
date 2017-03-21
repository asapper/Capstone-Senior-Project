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
*/


import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/models/button';

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
    templateUrl: './button-form.component.html'
})

export class ButtonFormComponent {
  // For output
  @Output() buttonCreated = new EventEmitter();

  newButton: Button = new Button();

  testButton: Button = new Button();
  // boolean used to clear all form values (even touched and invalid fields)
  active: boolean = true;

  onSubmit(){

    this.newButton.clickTimestamp = new Date();
    // Show the event that the button was created
    this.buttonCreated.emit({ button: this.newButton });

    // clears the form everytime it is submitted
    this.newButton = new Button();

    // clears forms and states invaled and touched
    this.active = false;
    setTimeout(() => this.active = true, 0);

  }
}

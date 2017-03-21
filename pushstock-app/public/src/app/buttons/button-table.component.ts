/*
* File:         button-table.component.ts
* Author:       Brennan Saul
* Description:  A component that displays all of the buttons in the DB
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/15/17		File created
*/


import { Component, Input, } from '@angular/core';

@Component ({
  selector: 'button-table',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './button-table.component.html'
})

export class ButtonTableComponent {
  // Reads in the buttonList passed from AppComponent
  @Input() buttonList: any[];
}

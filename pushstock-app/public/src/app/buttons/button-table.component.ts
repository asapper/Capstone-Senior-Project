/*  File:         button-table.component.ts
*   Author:       Brennan Saul
*   Description:  A component where one enters the information
*   Modified:
*                 March 15, 2017
*                   - File created
*/


import { Component, Input, } from '@angular/core';
import { Button } from '../shared/models/button';

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
  // For output
  @Input() buttonList: any[];

  //newButton: Button = new Button();

  //testButton: Button = new Button();
  // boolean used to clear all form values (even touched and invalid fields)
  //active: boolean = true;
}

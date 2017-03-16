/*  File:         task-table.component.ts
*   Author:       Collin Rapp
*   Description:  Creates and populates the list of open tasks.
*   Modified:
*                 March 15, 2017
*                   - File created and copied from ../buttons/button-table.component.ts
*/


import { Component, Input, } from '@angular/core';
import { Task } from '../shared/models/task';

@Component ({
  selector: 'task-table',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './task-table.component.html'
})

export class TaskTableComponent {
  // For output
  @Input() taskList: any[];

  //newButton: Button = new Button();

  //testButton: Button = new Button();
  // boolean used to clear all form values (even touched and invalid fields)
  //active: boolean = true;
}

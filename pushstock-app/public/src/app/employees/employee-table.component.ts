/*
* File:          employee-table.component.ts
* Author:       Brennan Saul
* Description:  The component which displays all employees in the DB
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/16/17		File created
*/


import { Component, Input, } from '@angular/core';
import { Employee } from '../shared/models/employee';

@Component ({
  selector: 'employee-table',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './employee-table.component.html'
})

export class EmployeeTableComponent {
  // Reads in the employeeList passed from AppComponent
  @Input() employeeList: any[];
}

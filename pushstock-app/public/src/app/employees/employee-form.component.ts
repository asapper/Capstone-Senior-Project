/*
* File:         employee-form.component.ts
* Author:       Brennan Saul
* Description:  A component used to add employees to the database
*
* Edit history:
*
* Editor	Date		Description
* ======	========	===========
* Saul		03/22/17	File created / Working EmployeeFormComponent
* Rapp    03/29/17  Moved API calls to EmployeeService
* Saul    04/18/17  Smart notifications added    
*/

import { Component } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../services/employee.service';
import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { Location } from '@angular/common';

@Component ({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    providers: [EmployeeService]
})

export class EmployeeFormComponent {
    roles: String[] = [ "Admin", "Worker" ];

    constructor(
      private employeeService: EmployeeService,
      private alertService: AlertService,
      private location: Location
    ) {}

    // Class used to group data added to mongoDb
    newEmployee: Employee = new Employee();

    addEmployee(email: String, password: String, firstName: String, lastName: String, role: String){
        // Add Employee using services
        this.employeeService.addEmployee(email, password, firstName, lastName, role)
        .subscribe(res => {
            this.alertService.handleApiResponse(res);
            this.location.back(); // Route back to buttons table
        });
    }
}

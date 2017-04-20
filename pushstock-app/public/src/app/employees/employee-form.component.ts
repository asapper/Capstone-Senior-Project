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
    providers: [
        EmployeeService
    ]
})

export class EmployeeFormComponent {
    // For output
    //@Output() employeeCreated = new EventEmitter();

    roles: String[] = [ "Admin", "Manager", "Worker" ];

    constructor(
      private employeeService: EmployeeService,
      private alertService: AlertService,
      private location: Location
    ) {}

    // Class used to group data added to mongoDb
    newEmployee: Employee = new Employee();

    // Used to clear form
    active: boolean = true;

    addEmployee(email: String, password: String, firstName: String, lastName: String, role: String){
        // Add Employee using services
        this.employeeService.addEmployee(email, password, firstName, lastName, role)
            .subscribe(employees => {
              let alert = new Alert();

              if(employees.message == "New employee created!"){
                //console.log("successful add");
                alert.title = "Success: ";
                alert.message = "New Employee added: " + firstName + " " + lastName;
                alert.type = "alert-success";
              }
              else{
                //console.log(this.message);
                alert.title = "Failed: ";
                alert.message = employees.message;
                alert.type = "alert-danger";
              }
              // update alert and route back to table
              this.alertService.setAlert(alert);
              this.location.back(); // Route back to buttons table
            });
    }
}

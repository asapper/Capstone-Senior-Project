/*
* File:         employee-table.component.ts
* Author:       Brennan Saul
* Description:	The component which displays all employees in the DB
*
* Edit history:
*
* Editor	Date		Description
* ======	========	===========
* Saul		  03/16/17	File created
* Saul      03/22/17    Calls API for the employee list
* Saul      03/22/17    Removed unnecessary code
* Saul      03/27/17    deleteEmployee() added
* Rapp		  03/29/17	Moved API calls to EmployeeService
* Saul      04/18/17    Adding notifications to employeeTable
*/


import { Component } from '@angular/core';

import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../services/employee.service';
import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';

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
	templateUrl: './employee-table.component.html',
    providers: [EmployeeService]
})

export class EmployeeTableComponent {
    employeeList: any[];
    alertType: string;
    alertTitle: string;
    alertMessage: string;
    modalMacAddr: string;

    constructor(
      private alertService: AlertService,
      private employeeService: EmployeeService
    ) {
        // init variables
        this.employeeList = [];
        this.alertType = "";
        this.alertTitle = "";
        this.alertMessage = "";
    }

    // Angular 2 Life Cycle event whem component has been initialized
    // Get the array of employees when the component is initialized
    ngOnInit() {
        this.getAllEmployees();
        this.retrieveLatestAlert();
    }

    // Function that returns all employees from the API
    getAllEmployees() {
        this.employeeService.getAllEmployees()
            .subscribe(employees => {
                this.employeeList = employees;
            });
    }


    // Function used to delete a button
    deleteEmployee(email: String) {
        this.employeeService.deleteEmployee(email).subscribe(ret => {
  			let alert = new Alert();
  			// Executes if Delete was successful
  			if(ret){
  				alert.title = "Success: "
  				alert.message = "Employee has been deleted.";
  				alert.type = "alert-info";
  			}
  			// Executes if an error was encountered during deletion
  			else{
  				alert.title = "Failed: ";
  				alert.message = "An error occured";
  				alert.type = "alert-danger";
  			}
  			// update alerts in list of buttons in this view
        this.alertService.setAlert(alert);
  			this.retrieveLatestAlert();
  			this.getAllEmployees();
  		});
    }

    // Deletes all employees in DB (For testing)
    deleteAllEmployees() {
        this.employeeService.deleteAllEmployees();
    }

    // Get the lates alert from the alertService
    retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
    }
}

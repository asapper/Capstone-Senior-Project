/*
* File:         employee-table.component.ts
* Author:       Brennan Saul
* Description:	The component which displays all employees in the DB
*
* Edit history:
*
* Editor	Date		Description
* ======	========	===========
* Saul		03/16/17	File created
* Saul      03/22/17    Calls API for the employee list
* Saul      03/22/17    Removed unnecessary code
* Saul      03/27/17    deleteEmployee() added
* Rapp		03/29/17	Moved API calls to EmployeeService
*/


import { Component } from '@angular/core';

import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../services/employee.service';

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

    constructor(private employeeService: EmployeeService) {
        // Initialize empty employee list so that size is defined
        this.employeeList = [];
    }

    // Angular 2 Life Cycle event whem component has been initialized
    // Get the array of employees when the component is initialized
    ngOnInit() {
        this.getAllEmployees();
    }

    // Function that returns all employees from the API
    getAllEmployees() {
        this.employeeService.getAllEmployees()
            .subscribe(employees => {
                console.log(employees);
                this.employeeList = employees;
            });
    }


    // Function used to delete a button
    deleteEmployee(email: String) {
        this.employeeService.deleteEmployee(email).subscribe();
        console.log('Deleted employee: ' + email);

        // Update employeeList
        this.getAllEmployees();
    }

    // Deletes all employees in DB (For testing)
    deleteAllEmployees() {
        this.employeeService.deleteAllEmployees();
        console.log('Deleted all employees');
    }
}

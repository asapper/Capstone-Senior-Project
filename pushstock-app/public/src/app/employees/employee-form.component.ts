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
* Rapp      03/29/17    Moved API calls to EmployeeService
*/

import { Component, Output, EventEmitter } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../services/employee.service';

@Component ({
    selector: 'employee-form',
    styles: [`
        form {
          padding: 10px;
          background: #ECF0F1;
          border-radius: 3px;
          margin-bottom: 30px;
        }
    `],
    templateUrl: './employee-form.component.html',
    providers: [
        EmployeeService
    ]
})

export class EmployeeFormComponent {
    // For output
    @Output() employeeCreated = new EventEmitter();

    roles: String[] = [ "Admin", "Manager", "Worker" ];

    constructor(private employeeService: EmployeeService) {}

    // Class used to group data added to mongoDb
    newEmployee: Employee = new Employee();

    // Used to clear form
    active: boolean = true;

    addEmployee(email: String, password: String, firstName: String, lastName: String, role: String){
        // Add Employee using services
        this.employeeService.addEmployee(email, password, firstName, lastName, role)
            .subscribe(employees => {
                console.log(employees);
            })

        // Emit event so that the table will know to update
        this.employeeCreated.emit();
        console.log("Employee added" + this.newEmployee);

        // clears the form everytime it is submitted
        this.newEmployee = new Employee();

        // clears forms and states invaled and touched
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}

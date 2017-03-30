/*
* File:         employee-form.component.ts
* Author:       Brennan Saul
* Description:  A component used to add employees to the database
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/22/17		File created / Working EmployeeFormComponent
*/

import { Component, Output, EventEmitter } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Http } from '@angular/http';

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
    providers: []
})

export class EmployeeFormComponent {
  // For output
  @Output() employeeCreated = new EventEmitter();

  API = 'https://localhost:4200/api';

  roles: String[] = [ "Admin", "Manager", "Worker" ];

  // Does anyone know what this does?
  constructor(private http: Http) {}

  // Class used to group data added to mongoDb
  newEmployee: Employee = new Employee();

  // Used to clear form
  active: boolean = true;

  addEmployee(email: String, password: String, firstName: String, lastName: String, role: String){

    // Add Employee through API
    this.http.post(`${this.API}/addEmployee`, { email, password, firstName, lastName, role })
    .map(res => res.json())
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

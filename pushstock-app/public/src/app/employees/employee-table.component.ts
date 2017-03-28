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
* Saul        03/22/17    Calls API for the employee list
* Saul        03/22/17    Removed unnecessary code
* Saul        03/27/17    deleteEmployee() added 
*/


import { Component } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Http } from '@angular/http';

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

  constructor(private http: Http) {}

  // API path
  API = 'https://localhost:4200/api';

  // Reads in the employeeList from the API
  employeeList: any[];

  employeeActive: boolean = false;

  // Angular 2 Life Cycle event whem component has been initialized
  // Get the array of employees when the component is initialized
  ngOnInit() {
      this.getAllEmployees();
  }

  // Function that returns all employees from the API
  getAllEmployees() {
      this.http.get(`${this.API}/employees`)
          .map(res => res.json())
          .subscribe(employees => {
              console.log(employees);
              this.employeeList = employees;
          })
  }

  // Function used to delete a button
  deleteEmployee(email: String){
    this.http.delete(`${this.API}/employees/${email}`)
    .map(res => res.json())
    .subscribe(employees => {
        console.log(employees);
        this.employeeList = employees;
    })
    console.log("delete employee: " + email);
    // Get updated list
    this.getAllEmployees();
  }


  // Function sets boolean to true showing the employee form
  setTrue() {
    this.employeeActive = true;
    console.log("set employeeActive to true");
  }

  // Deletes all employees in DB (For testing)
  deleteAllEmployees(){
    console.log("deleted employees");
    this.http.delete(`${this.API}/employees`)
  }
}

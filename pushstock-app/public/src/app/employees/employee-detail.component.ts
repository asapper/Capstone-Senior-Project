/*
 * File: employee-detail.component.ts
 * Author: Brennan Saul
 * Description: Component for editing a button.
 *
 * Edit history:
 *
 * Editor       Date           Description
 * ======       ========       ===========
 * Saul         03/28/17       File created
 * Saul         03/30/17       Edit employee now works
 */

 import 'rxjs/add/operator/switchMap';
 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Params } from '@angular/router';
 import { Location } from '@angular/common';
 import { Http } from '@angular/http';

 import { Employee } from '../shared/models/employee';

 @Component({
     selector: 'employee-detail',
     templateUrl: './employee-detail.component.html'
 })
 export class EmployeeDetailComponent implements OnInit {
     employee: any;
     oEmail: any; // used so that original email can be referenced
     // API path
     API = 'https://localhost:4200/api';

     roles: String[] = [ "Admin", "Manager", "Worker" ];

     constructor(
         private route: ActivatedRoute,
         private location: Location,
         private http: Http
     ) {}

     // On initilization of the component get the employee that we are editing
     ngOnInit(): void {
       let email = "";
       this.route.params.subscribe(params => {
           email = decodeURIComponent(params['email']);
           this.oEmail = email;
           console.log(email);
       });
             this.http.get(`${this.API}/employees/${email}`)
             .map(res => res.json())
             .subscribe(employee => {
               console.log("employee found" + employee);
               this.employee = employee;
               console.log("employee assigned" + this.employee);
             });
     }

     // Go back to the previous page
     goBack(): void {
         this.location.back();
     }

     // Update the information of an employee
     updateEmployee(oEmail: String, email: String, firstName: String, lastName: String, role: String): void {
         this.http.put(`${this.API}/employees/${oEmail}`, { oEmail, email, firstName, lastName, role })
         .map(res => res.json())
         .subscribe();
     }
 }

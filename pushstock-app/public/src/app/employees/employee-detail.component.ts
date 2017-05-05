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
 * Saul         04/18/17       notifications for edit employee added
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { Employee } from '../shared/models/employee';
import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'employee-detail',
    templateUrl: './employee-detail.component.html',
    providers: [EmployeeService]
})
export class EmployeeDetailComponent implements OnInit {
    employee: any;
    oEmail: any; // used so that original email can be referenced

    roles: String[] = [ "Admin", "Worker" ];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http,
        private alertService: AlertService,
        private employeeService: EmployeeService,
    ) {}

    // On initilization of the component get the employee that we are editing
    ngOnInit(): void {
        let email = "";
        this.route.params.subscribe(params => {
            email = decodeURIComponent(params['email']);
            this.oEmail = email;
        });
        this.employeeService.getEmployee(email)
        .subscribe(employee => {
            this.employee = employee;
        });
    }

    // Go back to the previous page
    goBack(): void {
        this.location.back();
    }

    // Update the information of an employee
    updateEmployee(oEmail: String, email: String, firstName: String, lastName: String, role: String, phone: String): void {
        this.employeeService.updateEmployee(oEmail, email, firstName, lastName, role, phone).subscribe(res => {
            this.alertService.handleApiResponse(res);
            this.goBack();
        });
    }
}

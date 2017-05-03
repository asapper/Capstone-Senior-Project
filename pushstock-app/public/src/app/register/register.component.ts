import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../services/index';
import { EmployeeService } from '../services/employee.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    providers: [EmployeeService]
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private alertService: AlertService,
        private employeeService: EmployeeService) { }

    register() {
        this.loading = true;
        this.employeeService.registerEmployee(this.model.username, this.model.password, this.model.firstName, this.model.lastName, 'Unassigned')
            .subscribe(
                data => {
                    this.alertService.setSuccessAlert('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log("Error: " + error);
                    this.error = error;
                    this.alertService.setErrorAlert(error);
                    this.loading = false;
                });
    }
}
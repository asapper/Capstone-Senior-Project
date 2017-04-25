/*
 * File: task-reassign.component.ts
 * Author: Andy Sapper
 * Description: Component to assign a task to a new employee
 *
 * Edit history:
 *
 * Editor       Date        Description
 * =====        =====       =====
 * Sapper       04/20/17    File created
 */


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';

@Component({
    selector: 'task-reassign',
    templateUrl: './task-reassign.component.html',
    providers: [EmployeeService, TaskService]
})
export class TaskReassignComponent implements OnInit {
    employees: any[];
    task: any;
    newTask: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private taskService: TaskService,
        private alertService: AlertService,
        private employeeService: EmployeeService
    ) {
        this.employees = [];
        this.task = {};
        this.newTask = {};
        this.newTask.employee = "";
    }

    ngOnInit(): void {
        let taskId = 0;
        this.route.params.subscribe(params => {
            taskId = params['taskId'];
        });
        // get task information
        this.taskService.getTask(taskId.toString()).subscribe(task => {
            this.task.description = task.button.description;
            this.task.id = task._id;
            this.task.employee_email = task.employee.email;
            // get employees
            this.employeeService.getAllEmployees().subscribe(employees => {
                // remove currently assigned employee
                this.employees = employees.filter(emp => emp.email !== this.task.employee_email);
            });
        });
    }

    // Route back to tasks table
    goBack(): void { 
        this.location.back();
    }

    reassignTask(employee_email: string): void {
        this.taskService.reassignTask(this.task.id, employee_email).subscribe(err => {
            let alert = new Alert();
            if (err) {
                alert.title = 'Error: ';
                alert.message = err.message;
                alert.type = 'alert-danger';
            } else {
                alert.title = 'Success: ';
                alert.message = data.message;
                alert.type = 'alert-success';
            }
            this.alertService.setAlert(alert);
            this.location.back(); // route back to tasks table
        });
    }

}

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
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { TaskService } from '../services/task.service';

@Component({
    selector: 'task-reassign',
    templateUrl: './task-reassign.component.html',
    providers: [TaskService]
})
export class TaskReassignComponent implements OnInit {
    employees: any[];
    task: any;

     constructor(
         private location: Location,
         private taskService: TaskService,
         private alertService: AlertService
     ) {
         this.employees = [];
     }

     ngOnInit(): void {
     }

     // Route back to tasks table
     goBack(): void { 
         this.location.back();
     }

     reassignTask(macAddr: string, employee_email: string): void {
         this.taskService.reassignTask(macAddr, employee_email).subscribe(err => {
            let alert = new Alert();
            if (err) {
                alert.title = 'Failed: ';
                alert.message = err.message;
                alert.type = 'alert-danger';
            } else {
                alert.title = 'Success: ';
                alert.message = 'task has been reassigned!';
                alert.type = 'alert-success';
            }
            this.alertService.setAlert(alert);
            this.location.back(); // route back to tasks table
         });
     }

}

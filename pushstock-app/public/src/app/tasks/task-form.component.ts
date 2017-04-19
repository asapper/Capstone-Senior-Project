 /*
  * File: task-form.component.ts
  * Author: Andy Sapper
  * Description: component for creating a task.
  *
  * Edit history:
  *
  * Editor      Date            Description
  * ======      ========        ===========
  * Sapper      04/07/17        File created
  */

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { Task } from '../shared/models/task';
import { TaskService } from '../services/task.service';
import { ButtonService } from '../services/button.service';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'task-form',
    templateUrl: './task-form.component.html',
    providers: [ButtonService, EmployeeService, TaskService]
})
export class TaskFormComponent implements OnInit {
    public newTask: Task = new Task();
    public buttons: any[];
    public employees: any[];

    constructor(
        private location: Location,
        private buttonService: ButtonService,
        private employeeService: EmployeeService,
        private taskService: TaskService,
        private alertService: AlertService
    ) {
        this.buttons = [];
        this.employees = [];
    }

    ngOnInit(): void {
        // retrieve all buttons
        this.buttonService.getAllActiveButtons()
        .subscribe(buttons => {
            this.buttons = buttons;
        });
        // retrieve all employees
        this.employeeService.getAllEmployees()
        .subscribe(employees => {
            this.employees = employees;
        });
    }

    // Add a new task to the database
    addTask(employee_email: string, button_mac_addr: string): void {
        // add task through task service
        this.taskService.addTask(employee_email, button_mac_addr).subscribe( ret => {
            let alert = new Alert();
            if (ret.message == "New task created!") {
                //console.log("successful add");
                alert.title = "Success: ";
                alert.message = "New task has been created";
                alert.type = "alert-success";
            }
            else{
                //console.log(this.message);
                alert.title = "Failed: ";
                alert.message = ret.message;
                alert.type = "alert-danger";

            }
            this.alertService.setAlert(alert);
            this.goBack(); // Route back to buttons table
          }
        );
    }

    goBack(): void {
        this.location.back();
    }
}

/*
* File: task-table.component.ts
* Description: Component for displaying all the open tasks.
*
* Edit history:
*
* Editor        Date            Description
* ======        ========        ===========
* Rapp          03/23/17        File created (copied from employee-table.component.ts)
* Sapper        04/06/17        Add task and alert services
*/


import { Component, OnInit } from '@angular/core';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { TaskService } from '../services/task.service';

const TASKS = [
    { 
        button: { macAddr: '1', description: 'asd', isActive: true },
        employee: { firstName: 'a', lastName: 'v', email: 'v', password: 'sd', role: 's', resetPasswordToken: 'df', resetPasswordExpires: null }
    },
];

@Component ({
    selector: 'task-table',
    templateUrl: './task-table.component.html',
    providers: [TaskService]
})
export class TaskTableComponent implements OnInit {
    taskList: any[];
    alertType: string;
    alertTitle: string;
    alertMessage: string;

    constructor(
        private alertService: AlertService,
        private taskService: TaskService
    ) {
        this.taskList = [];
        this.alertType = "";
        this.alertTitle = "";
        this.alertMessage = "";
    }

    // Angular 2 Life Cycle event when component has been initialized
    // Get the array of tasks when the component is initialized
    ngOnInit(): void {
        this.retrieveLatestAlert();
        this.getAllTasks();
        //this.taskList = TASKS;
    }

    private retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestTaskAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
    }

    // Returns all open tasks
    getAllTasks() {
        this.taskService.getAllTasks()
        .subscribe(tasks => {
            this.taskList = tasks;
        });
    }
}

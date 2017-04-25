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
* Saul          04/20/17        Task complete function implemented
*/


import { Component, OnInit } from '@angular/core';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { TaskService } from '../services/task.service';

const TASKS = [
    {
        _id: 123,
        button: { macAddr: '1', description: 'asd', isActive: true },
        employee: { profile: { firstName: 'a', lastName: 'v' }, email: 'v', password: 'sd', role: 's', resetPasswordToken: 'df', resetPasswordExpires: null }
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
    taskId: any;

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
        this.getOpenTasks();
        //this.taskList = TASKS;
    }

    private retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
    }

    // Mark task completed
    markTaskComplete(_id): void{
      this.taskService.markTaskComplete(_id).subscribe( ret => {
        let alert = new Alert();
  			// Executes if Delete was successful
  			if(ret.message == "Task marked complete"){
  				alert.title = "Success: "
  				alert.message = "Task marked completed";
  				alert.type = "alert-success";
  			}
  			// Executes if an error was encountered during deletion
  			else{
  				alert.title = "Failed: ";
  				alert.message = ret.message;
  				alert.type = "alert-danger";
  			}
  			// update alerts in list of buttons in this view
        this.alertService.setAlert(alert);
  			this.retrieveLatestAlert();
  			this.getAllTasks();
  		});
    }

    // Returns all tasks
    getAllTasks(): void {
        this.taskService.getAllTasks()
        .subscribe(tasks => {
            this.taskList = tasks;
        });
    }

    // Returns all open tasks
    getOpenTasks() {
        this.taskService.getOpenTasks()
        .subscribe(tasks => {
            this.taskList = tasks;
        });
    }

    // Returns all Completed tasks
    getCompletedTasks() {
        this.taskService.getCompletedTasks()
        .subscribe(tasks => {
            this.taskList = tasks;
        });
    }

    /* Determines which tasks to retireve
    getTasks(): void{
      if(this.display == 'Open'){
        this.getOpenTasks();
      }
      else if(this.display == 'All'){
        this.getAllTasks();
      }
      else{
        //this.getCompletedTasks();
      }
    }
    */
}

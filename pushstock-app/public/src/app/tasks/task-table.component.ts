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
        employee: { profile: { firstName: 'John', lastName: 'Smith' }, email: 'v', password: 'sd', role: 's', resetPasswordToken: 'df', resetPasswordExpires: null }
    },
];

@Component ({
    selector: 'task-table',
    templateUrl: './task-table.component.html',
    providers: [TaskService]
})
export class TaskTableComponent implements OnInit {
    taskList: any[];
    filteredList: any[];
    alertType: string;
    alertTitle: string;
    alertMessage: string;
    modalDescription: string = "";
    modalEmployee: string = "";
    modalTaskId: string = "";

    // booleans used for filtering
    all: boolean = false;
    open: boolean = true;

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
    }

    private retrieveLatestAlert(): void {
        let alert: Alert = this.alertService.getLatestAlert();
        this.alertTitle = alert.title;
        this.alertType = alert.type;
        this.alertMessage = alert.message;
    }

    // Filter task list based on selected tab {open, closed, all}
    private filterTasks(): void{
      this.filteredList = this.taskList;
      if(!this.all){
        if(this.open){
          this.filteredList = this.taskList.filter(
            task => task.isOpen === true);
        }
        else{
            this.filteredList = this.taskList.filter(
              task => task.isOpen === false);
        }
      }
    }

    // filter to Open buttons
    private filterOpen(){
      this.open = true;
      this.all = false;
      this.filterTasks();
    }
    // Filter to closed buttons
    private filterClose(){
      this.open = false;
      this.all = false;
      this.filterTasks();
    }
    // Filter to all buttons
    private filterAll(){
      this.all = true;
      this.filterTasks();
    }



    // Mark task completed
    markTaskComplete(_id): void{
        this.taskService.markTaskComplete(_id).subscribe(res => {
            this.alertService.handleApiResponse(res);
  			this.retrieveLatestAlert();
  			this.getAllTasks();
  		});
    }

    // Returns all tasks
    getAllTasks(): void {
        this.taskService.getAllTasks()
        .subscribe(tasks => {
            this.taskList = tasks;
            this.filterTasks();
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

    setTaskInfoToDelete(taskId: string, description: string, employee: string): void {
        this.modalTaskId = taskId;
        this.modalDescription = description;
        this.modalEmployee = employee;
    }

    deleteTask(taskId: number): void {
        this.taskService.deleteTask(taskId.toString()).subscribe(res => {
            this.alertService.handleApiResponse(res);
            this.retrieveLatestAlert();
            this.getAllTasks();
        });
    }

}

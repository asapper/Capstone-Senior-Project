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
* Sapper        05/02/17        Filter tasks according to email
*/

import { Component, OnInit } from '@angular/core';

import { Alert } from '../shared/models/alert';
import { AlertService } from '../services/alert.service';
import { TaskService } from '../services/task.service';
import { JwtHelper } from 'angular2-jwt';

@Component ({
    selector: 'task-table',
    templateUrl: './task-table.component.html',
    providers: [TaskService]
})
export class TaskTableComponent implements OnInit {
    // variables to store list of tasks
    taskList: any[];
    filteredList: any[];
    // variables used to display information in notifications
    alertType: string;
    alertTitle: string;
    alertMessage: string;
    // variables used to display information in modals
    modalDescription: string = "";
    modalEmployee: string = "";
    modalTaskId: string = "";
    // store if user is admin
    isAdmin: boolean = false;
    // authentication
    private jwtHelper: JwtHelper = new JwtHelper();

    // booleans used for filtering
    private all: boolean = false;
    private open: boolean = true;

    constructor(
        private alertService: AlertService,
        private taskService: TaskService
    ) {
        this.taskList = [];
        this.filteredList = [];
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
            // filter tasks according to worker
            if (localStorage.getItem('token') !== null) {
                let token = localStorage.getItem('token');
                let decoded = this.jwtHelper.decodeToken(token);
                if (decoded.role === 'Admin') {
                    this.taskList = tasks;
                    this.isAdmin = true;
                } else {
                    this.taskList = tasks.filter(
                        task => task.employee.email === decoded.email);
                    this.isAdmin = false;
                }
            }
            this.filterTasks();
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

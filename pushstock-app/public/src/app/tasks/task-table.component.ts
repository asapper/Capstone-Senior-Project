/*
* File:					task-table.component.ts
* Description:  Component for displaying all the open tasks.
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Rapp			  03/23/17		File created (copied from employee-table.component.ts)
*/


import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component ({
  selector: 'task-table',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './task-table.component.html'
})

export class TaskTableComponent {
	taskList: any[];

  constructor(private http: Http) {
		this.taskList = [];
	}

  // API path
  API = 'https://localhost:4200/api';

  // Reads in the taskList from the API
  //taskList: any[];

  taskActive: boolean = false;

  // Angular 2 Life Cycle event when component has been initialized
  // Get the array of tasks when the component is initialized
  ngOnInit() {
		//this.getAllTasks();
  }

	// Returns all open tasks
	getAllTasks() {
		this.http.get(`${this.API}/tasks`)
			.map(res => res.json())
			.subscribe(tasks => {
				console.log(tasks);
				this.taskList = tasks;
			})
	}

	// Delete all open tasks (for testing)
	deleteAllTasks() {
		console.log('deleting all tasks');
		this.http.delete(`${this.API}/tasks`);
	}
	
	setTrue() {
		this.taskActive = true;
		console.log('set taskActive to true');
	}

	/*
	 
  // Function that returns all employees from the API
  getAllEmployees() {
      this.http.get(`${this.API}/employees`)
          .map(res => res.json())
          .subscribe(employees => {
              console.log(employees);
              this.employeeList = employees;
          })
  }

  // Function sets boolean to true showing the employee form
  setTrue() {
    this.employeeActive = true;
    console.log("set employeeActive to true");
  }

  // Deletes all employees in DB (For testing)
  deleteAllEmployees(){
    console.log("deleted employees");
    this.http.delete(`${this.API}/employees`)
  }
	
	*/
}

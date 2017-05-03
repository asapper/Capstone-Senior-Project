/*
 * File: task.service.ts
 * Description: provides task info exposed by the API.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ======       ========        ===========
 * Sapper       04/06/17        File created
 * Saul         04/20/17        markTaskComplete function added
 * Ragnell      05/02/17        Added use of angular2-jwt authHttp for API authorization
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TaskService {
    private api: String;

    constructor(
        private http: Http, private authHttp: AuthHttp
    ) {
        this.api = ApiSettings.API;
    }

    getTask(taskId: string) {
        return this.authHttp.get(`${this.api}/tasks/${taskId}`)
        .map(res => res.json());
    }

    // Function that returns all tasks from the API
    getAllTasks() {
        return this.authHttp.get(`${this.api}/tasks`)
        .map(res => res.json());
    }

    // Function that returns all tasks from the API
    getOpenTasks() {
        return this.authHttp.get(`${this.api}/openTasks`)
        .map(res => res.json());
    }

    // Function that returns all tasks from the API
    getCompletedTasks() {
        return this.authHttp.get(`${this.api}/completedTasks`)
        .map(res => res.json());
    }

    // Function to add task manually
    addTask(employee_email: string, button_mac_addr: string) {
        return this.authHttp.post(`${this.api}/addTask`, { employee_email, button_mac_addr })
        .map(res => res.json());
    }

    // Function to reassign task to another employee
    reassignTask(task_id: string, employee_email: string) {
        return this.authHttp.put(`${this.api}/reassigntask`, { task_id, employee_email })
        .map(res => res.json());
    }

    // Function to mark task complete
    markTaskComplete(_id: any) {
        return this.authHttp.put(`${this.api}/tasks/${_id}`, { })
        .map(res => res.json());
    }

    deleteTask(taskId: string) {
        return this.authHttp.delete(`${this.api}/tasks/${taskId}`)
        .map(res => res.json());
    }

}

/*
 * File: task.service.ts
 * Description: provides task info exposed by the API.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ======       ========        ===========
 * Sapper       04/06/17        File created
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class TaskService {
    private api: String;

    constructor(
        private http: Http
    ) {
        this.api = ApiSettings.API;
    }

    // Function that returns all tasks from the API
    getAllTasks() {
        return this.http.get(`${this.api}/tasks`)
        .map(res => res.json());
    }

    // Function to add task manually
    addTask(employee_email: string, button_mac_addr: string) {
        return this.http.post(`${this.api}/addTask`, { employee_email, button_mac_addr })
        .map(res => res.json());
    }

    // Function to reassign task to another employee
    reassignTask(button_mac_addr: string, employee_email: string) {
        return this.http.put(`${this.api}/reassigntask`, { button_mac_addr, employee_email })
        .map(res => res.json());
    }
}

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
}

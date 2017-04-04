/*
* File:         employee-table.component.ts
* Author:       Brennan Saul
* Description:  The root component
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/16/17		getEmployees added
* Saul        03/20/17    implemented Delete and Add employees functionality
* Saul        03/21/17    Moved functionality for buttons into button components
* Saul        03/22/17    Moved Employee functionality into employee components
*/

import { Component } from '@angular/core';
import 'rxjs/add/operator/map';

import { AlertService } from './services/alert.service';
	

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [AlertService]
})
export class AppComponent {
    title = 'PushStock';

    // Does anyone know what this does?
    constructor(alertService: AlertService) {}
}

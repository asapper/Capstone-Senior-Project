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
import { Http } from '@angular/http';
import { Button } from './shared/models/button';
// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    // Link to our api, pointing to localhost
    API = 'https://localhost:4200/api';

    // booleans used to determine which view should be displayed in the web app
    welcomeView: boolean = true;
    buttonView: boolean = false;
    workerView: boolean = false;

    /*  Functions called to change the current view of the client app
    *   may be a good idea to try figure out to combine these. A fuction that
    *   sets the passe boolean variable to true and the rest to false
    */
    changeToHomeView(){
      this.welcomeView = true;
      this.buttonView = false;
      this.workerView = false;
    }

    changeToButtonView(){
      this.welcomeView = false;
      this.buttonView = true;
      this.workerView = false;
    }

    changeToWorkerView(){
      this.welcomeView = false;
      this.buttonView = false;
      this.workerView = true;
    }

    // Does anyone know what this does?
    constructor(private http: Http) {}
}

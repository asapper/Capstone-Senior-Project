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

    // Empty list of buttons
    buttons: any[] = [];

    // booleans used to determine which view should be displayed in the web app
    welcomeView: boolean = true;
    buttonView: boolean = false;
    workerView: boolean = false;

    // Boolean flag that controls if the buttonform is displayed
    buttonActive: boolean = false;

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

    // Used to set buttonActive variable to true
    setTrue() {
      this.buttonActive = true;
      console.log("set buttonActive to true")
    }

    // Angular 2 Life Cycle event whem component has been initialized
    ngOnInit() {
        this.getAllButtons();
    }

    // Function called when a button is created
	  onButtonCreated(buttonId: number, clickTimestamp: Date, buttonDescription: string){
      this.http.post(`${this.API}/addButton`, { buttonId, clickTimestamp, buttonDescription })
     .map(res => res.json())
     .subscribe(() => {
       this.getAllButtons();
     })

     console.log("button added");

	  }


    // Function that returns all buttons from the API
    getAllButtons() {
        this.http.get(`${this.API}/buttons`)
            .map(res => res.json())
            .subscribe(buttons => {
                console.log(buttons);
                this.buttons = buttons;
            })
    }
}

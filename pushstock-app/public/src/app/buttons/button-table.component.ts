/*
* File:         button-table.component.ts
* Author:       Brennan Saul
* Description:  A component that displays all of the buttons in the DB
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/15/17		File created
* Saul        03/21/17    Calls API instead of relying on AppComponent
* Saul        03/21/17    Self contained & calls the ButtonFormComponent
* Saul        03/27/17    deleteButton() added
*/


import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component ({
  selector: 'button-table',
  styles: [`
    form {
      padding: 10px;
      background: #ECF0F1;
      border-radius: 3px;
      margin-bottom: 30px;
    }
  `],
    templateUrl: './button-table.component.html'
})

export class ButtonTableComponent {
  constructor(private http: Http) {}

  // API path
  API = 'https://localhost:4200/api';

  buttonList: any[];

  // Boolean flag that controls if the buttonform is displayed
  buttonActive: boolean = false;

  // Angular 2 Life Cycle event whem component has been initialized
  // Get the array of buttons when the component is initialized
  ngOnInit() {
      this.getAllButtons();
  }

  // Function that returns all buttons from the API
  getAllButtons() {
      this.http.get(`${this.API}/buttons`)
          .map(res => res.json())
          .subscribe(buttons => {
              console.log(buttons);
              this.buttonList = buttons;
          })
  }

  // Function used to delete a button
  deleteButton(macAddr: String){
    this.http.delete(`${this.API}/buttons/${macAddr}`)
    .map(res => res.json())
    .subscribe(buttons => {
        console.log(buttons);
        this.buttonList = buttons;
    })
    console.log("deletebutton: " + macAddr);
    // Get updated list
    this.getAllButtons();
  }

  setTrue() {
    this.buttonActive = true;
    console.log("set buttonActive to true");
  }

}

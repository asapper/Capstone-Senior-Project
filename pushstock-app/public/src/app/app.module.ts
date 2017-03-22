/*
* File:         app.modules.ts
* Author:       Brennan Saul
* Description:  In charge of including components and imports
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  03/15/17		ButtonTableComponent added
* Saul			  03/16/17		EmployeeTableComponent added
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';
import { EmployeeTableComponent } from './employees/employee-table.component';
import { EmployeeFormComponent } from './employees/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonFormComponent,
    ButtonTableComponent,
    EmployeeTableComponent,
    EmployeeFormComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ButtonTableComponent,
    EmployeeTableComponent,
    EmployeeFormComponent
  ]
})
export class AppModule { }

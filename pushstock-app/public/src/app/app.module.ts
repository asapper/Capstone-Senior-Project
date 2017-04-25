/*
* File:         app.modules.ts
* Author:       Brennan Saul
* Description:  In charge of including components and imports
*
* Edit history:
*
* Editor        Date			Description
* ======		========		===========
* Saul          03/15/17		ButtonTableComponent added
* Saul			03/16/17		EmployeeTableComponent added
* Rapp			03/21/17		Switched to use Angular2's built-in routing module
* Sapper        03/27/17        Add ButtonDetail component
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';
import { EmployeeTableComponent } from './employees/employee-table.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { TaskTableComponent } from './tasks/task-table.component';
import { ButtonDetailComponent } from './buttons/button-detail.component';
import { ButtonAssignComponent } from './buttons/button-assign.component';
import { ButtonUnassignComponent } from './buttons/button-unassign.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './authorization/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AlertService, AuthService } from './services/index';
import { LoginRouteGuard } from './guards/login';
import { AdminRouteGuard } from './guards/admin';

@NgModule({
    declarations: [
        AppComponent,
        ButtonFormComponent,
        ButtonTableComponent,
        ButtonDetailComponent,
        ButtonAssignComponent,
        ButtonUnassignComponent,
        EmployeeTableComponent,
        EmployeeFormComponent,
        EmployeeDetailComponent,
        TaskTableComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        UnauthorizedComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        AlertService,
        AuthService,
        LoginRouteGuard,
        AdminRouteGuard
    ],
	bootstrap: [
        AppComponent
    ]
})

export class AppModule { }

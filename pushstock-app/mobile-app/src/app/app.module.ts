/*
* File:         app.modules.ts
* Author:       Collin Rapp
* Description:  In charge of including components and imports for the mobile app
*
* Edit history:
*
* Editor        Date			Description
* ======		========		===========
* Rapp          05/01/17        File created (based on public/src/app/app.module.ts)
* Rapp          05/03/17        Added authorization changes for mobile
*/

import { IonicApp, IonicModule } from 'ionic-angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { TaskTableComponent } from './tasks/task-table.component';
import { TaskFormComponent } from './tasks/task-form.component';
import { TaskReassignComponent } from './tasks/task-reassign.component';

import { EmployeeTableComponent } from './employees/employee-table.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';

import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';
import { ButtonDetailComponent } from './buttons/button-detail.component';
import { ButtonAssignComponent } from './buttons/button-assign.component';
import { ButtonUnassignComponent } from './buttons/button-unassign.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './authorization/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';

import { AlertService, AuthService, ButtonService, EmployeeService } from './services/index';
import { LoginRouteGuard } from './guards/login';
import { AdminRouteGuard } from './guards/admin';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(
        {
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            headerPrefix: 'JWT'
        }),
        http,
        options
    );
}

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
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TaskTableComponent,
        TaskFormComponent,
        TaskReassignComponent,
        UnauthorizedComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppRoutingModule,
        IonicModule.forRoot(AppComponent, {
            platforms: {
                ios: {
                    statusbarPadding: false
                }
            }
        }, {})
    ],
    entryComponents: [
        AppComponent,
        ButtonFormComponent,
        ButtonTableComponent,
        ButtonDetailComponent,
        ButtonAssignComponent,
        ButtonUnassignComponent,
        EmployeeTableComponent,
        EmployeeFormComponent,
        EmployeeDetailComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TaskTableComponent,
        TaskFormComponent,
        TaskReassignComponent,
        UnauthorizedComponent
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AdminRouteGuard,
        AlertService,
        AuthService,
        ButtonService,
        EmployeeService,
        LoginRouteGuard
    ],
	bootstrap: [
        IonicApp
    ]
})

export class AppModule { }

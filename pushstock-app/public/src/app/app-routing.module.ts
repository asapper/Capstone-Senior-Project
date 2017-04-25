/*
 * File:					app-routing.module.ts
 * Description:		Defines the routes to the different views (components) in the app.
 *
 * Edit history:
 *
 * Editor			Date				Description
 * =====			========		===========
 * Rapp				03/21/17		File created and Routes defined
 * Rapp				03/23/17		Updated component names and paths
 * Saul				03/28/17		Added route for EmployeeDetailComponent
 * Ragnell    04/06/17    Modified to use child routes of home page post-login
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { LoginRouteGuard } from './guards/login';
import { AdminRouteGuard } from './guards/admin';
import { RegisterComponent } from './register/index';
import { UnauthorizedComponent } from './authorization/index';

import { TaskTableComponent } from './tasks/task-table.component';
import { EmployeeTableComponent } from './employees/employee-table.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';
import { ButtonDetailComponent } from './buttons/button-detail.component';
import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonAssignComponent } from './buttons/button-assign.component';
import { ButtonUnassignComponent } from './buttons/button-unassign.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', 
    component: HomeComponent, 
    canActivate: [LoginRouteGuard],
    children: [
    { path: 'buttons', component: ButtonTableComponent, pathMatch: 'full', canActivate: [AdminRouteGuard] },
    { path: 'tasks', component: TaskTableComponent, pathMatch: 'full' },
    { path: 'buttons', component: ButtonTableComponent, pathMatch: 'full' },
    { path: 'buttons/new', component: ButtonFormComponent, pathMatch: 'full' },
    { path: 'buttons/assign', component: ButtonAssignComponent, pathMatch: 'full' },
    { path: 'buttons/unassign', component: ButtonUnassignComponent, pathMatch: 'full' },
    { path: 'buttons/:macAddr', component: ButtonDetailComponent, pathMatch: 'full' },
    { path: 'employees', component: EmployeeTableComponent, pathMatch: 'full' },
    { path: 'employees/new', component: EmployeeFormComponent, pathMatch: 'full' },
    { path: 'employees/:email', component: EmployeeDetailComponent, pathMatch: 'full' },
    { path: 'unauthorized', component: UnauthorizedComponent, pathMatch: 'full'}
    ]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule{}

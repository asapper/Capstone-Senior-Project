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
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskTableComponent } from './tasks/task-table.component';
import { EmployeeTableComponent } from './employees/employee-table.component';
import { ButtonTableComponent } from './buttons/button-table.component';

const routes: Routes = [
	{ path: '', redirectTo: '/tasks', pathMatch: 'full'},
	{ path: 'tasks', component: TaskTableComponent},
	{ path: 'buttons', component: ButtonTableComponent},
	{ path: 'employees', component: EmployeeTableComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule{}

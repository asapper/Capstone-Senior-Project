/*
 * File:					app-routing.module.ts
 * Description:		Defines the routes to the different views (components) in the app.
 *
 * Edit history:
 *
 * Editor			Date				Description
 * =====			========		===========
 * Rapp				03/21/17		File created and Routes defined
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO correct these paths
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { ButtonsComponent } from './buttons/buttons.component';

// TODO correct these component names
const routes: Routes = [
	{ path: '', redirectTo: '/tasks', pathMatch: full},
	{ path: 'tasks', component: TasksComponent},
	{ path: 'buttons', component: ButtonsComponent},
	{ path: 'employees', component: EmployeesComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule{}

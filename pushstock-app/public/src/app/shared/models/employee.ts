/*
* File:           butons.ts
* Author:         Brennan Saul
* Description:    employee.ts contains the export class Employee.
*                 I have created this class so that We could unclutter
*                 app.component.ts and to represent the concept of an Employee
* Edit history:
*
* Editor			Date				Description
* ------			--------		-----------
* Saul			  03/16/17		File created
*/

export class Employee {
  firstName:            String;
  lastName:             String;
  email:                String; // Primary key
  password:             String;
  role:                 String;
  resetPasswordToken:   String;
  resetPAsswordExpires: Date;
}

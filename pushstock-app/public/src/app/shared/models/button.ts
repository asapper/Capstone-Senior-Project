/*
* File:         butons.ts
* Author:       Brennan Saul
* Description:  button.ts contains the export class Button.
*                 I have created this class so that We could unclutter
*                 app.component.ts and to represent the concept of a Flic
*                 button.
*
* Edit history:
*
* Editor			Date				Description
* ======			========		===========
* Saul			  02/15/17		File created
*/

export class Button {
  buttonId:          String; // Primary key
  clickTimestamp:    Date;
  buttonDescription: String
}

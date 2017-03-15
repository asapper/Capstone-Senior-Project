/*  File:         butons.ts
*   Author:       Brennan Saul
*   Description:  button.ts contains the export class User.
*                 I have created this class so that We could unclutter
*                 app.component.ts and to represent the concept of a Flic
*                 button.
*/

export class Button {
  buttonId:          String; // Primary key
  clickTimestamp:    Date;
  buttonDescription: string
}

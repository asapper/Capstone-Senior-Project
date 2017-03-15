import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonFormComponent,
    ButtonTableComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

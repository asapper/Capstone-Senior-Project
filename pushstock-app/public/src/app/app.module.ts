import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app-routing.module';

import { AppComponent } from './app.component';
import { ButtonFormComponent } from './buttons/button-form.component';
import { ButtonTableComponent } from './buttons/button-table.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AlertService, AuthenticationService } from './services/index';
import { LoginRouteGuard } from './guards/login';

@NgModule({
  declarations: [
    AppComponent,
    ButtonFormComponent,
    ButtonTableComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AlertService,
    AuthenticationService,
    LoginRouteGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

import { Routes, RouterModule } from '@angular/router';

//import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { LoginRouteGuard } from './guards/login';
import { ButtonTableComponent } from './buttons/button-table.component';
import { RegisterComponent } from './register/index';
//import { RegisterComponent } from './register/index';
//import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', 
      component: HomeComponent, 
      canActivate: [LoginRouteGuard],
      canActivateChild: [LoginRouteGuard],
  	  children: [
  	  { path: 'buttons', component: ButtonTableComponent }
  	  ]},
    { path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);
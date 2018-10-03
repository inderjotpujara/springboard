import { Routes } from '@angular/router';
import { DetailsComponent } from '../details/details.component'
import { LoginComponent } from '../login/login.component'

export const routes: Routes = [
    { path: 'details',  component:  DetailsComponent },
    { path: 'login',  component:  LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
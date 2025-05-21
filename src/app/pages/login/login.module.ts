// src/app/pages/login/login.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login.page').then(m => m.LoginPage),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule], 
})
export class LoginPageModule { }

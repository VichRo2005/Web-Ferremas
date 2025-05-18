// src/app/pages/login/login.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login.page').then(m => m.LoginPage),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LoginPageModule { }

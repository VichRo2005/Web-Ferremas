import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegueroListarstockPage } from './bodeguero-listarstock.page';

const routes: Routes = [
  {
    path: '',
    component: BodegueroListarstockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegueroListarstockPageRoutingModule {}

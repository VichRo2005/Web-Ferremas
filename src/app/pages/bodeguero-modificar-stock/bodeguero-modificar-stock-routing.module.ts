import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegueroModificarStockPage } from './bodeguero-modificar-stock.page';

const routes: Routes = [
  {
    path: '',
    component: BodegueroModificarStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegueroModificarStockPageRoutingModule {}

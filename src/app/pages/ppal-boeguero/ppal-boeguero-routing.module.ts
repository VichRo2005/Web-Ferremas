import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpalBoegueroPage } from './ppal-boeguero.page';

const routes: Routes = [
  {
    path: '',
    component: PpalBoegueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpalBoegueroPageRoutingModule {}

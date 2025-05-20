import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceCompraExitosaPage } from './ecommerce-compra-exitosa.page';

const routes: Routes = [
  {
    path: '',
    component: EcommerceCompraExitosaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceCompraExitosaPageRoutingModule {}

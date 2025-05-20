import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceCompraFallidaPage } from './ecommerce-compra-fallida.page';

const routes: Routes = [
  {
    path: '',
    component: EcommerceCompraFallidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceCompraFallidaPageRoutingModule {}

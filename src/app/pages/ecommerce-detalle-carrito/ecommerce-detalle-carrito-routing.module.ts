import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceDetalleCarritoPage } from './ecommerce-detalle-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: EcommerceDetalleCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceDetalleCarritoPageRoutingModule {}

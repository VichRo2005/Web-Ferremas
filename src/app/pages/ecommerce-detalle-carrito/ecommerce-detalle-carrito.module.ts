import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommerceDetalleCarritoPageRoutingModule } from './ecommerce-detalle-carrito-routing.module';

import { EcommerceDetalleCarritoPage } from './ecommerce-detalle-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcommerceDetalleCarritoPageRoutingModule
  ],
  declarations: [EcommerceDetalleCarritoPage]
})
export class EcommerceDetalleCarritoPageModule {}

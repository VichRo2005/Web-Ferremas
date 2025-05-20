import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommerceCompraExitosaPageRoutingModule } from './ecommerce-compra-exitosa-routing.module';

import { EcommerceCompraExitosaPage } from './ecommerce-compra-exitosa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcommerceCompraExitosaPageRoutingModule
  ],
  declarations: [EcommerceCompraExitosaPage]
})
export class EcommerceCompraExitosaPageModule {}

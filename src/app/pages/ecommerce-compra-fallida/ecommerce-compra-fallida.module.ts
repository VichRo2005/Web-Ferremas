import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommerceCompraFallidaPageRoutingModule } from './ecommerce-compra-fallida-routing.module';

import { EcommerceCompraFallidaPage } from './ecommerce-compra-fallida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcommerceCompraFallidaPageRoutingModule
  ],
  declarations: [EcommerceCompraFallidaPage]
})
export class EcommerceCompraFallidaPageModule {}

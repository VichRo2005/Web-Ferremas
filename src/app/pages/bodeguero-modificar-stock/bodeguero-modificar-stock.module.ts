import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegueroModificarStockPageRoutingModule } from './bodeguero-modificar-stock-routing.module';

import { BodegueroModificarStockPage } from './bodeguero-modificar-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegueroModificarStockPageRoutingModule
  ],
  declarations: [BodegueroModificarStockPage]
})
export class BodegueroModificarStockPageModule {}

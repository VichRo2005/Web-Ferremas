import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegueroListarstockPageRoutingModule } from './bodeguero-listarstock-routing.module';

import { BodegueroListarstockPage } from './bodeguero-listarstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegueroListarstockPageRoutingModule
  ],
  declarations: [BodegueroListarstockPage]
})
export class BodegueroListarstockPageModule {}

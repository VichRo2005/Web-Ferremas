import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpalBoegueroPageRoutingModule } from './ppal-boeguero-routing.module';

import { PpalBoegueroPage } from './ppal-boeguero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpalBoegueroPageRoutingModule
  ],
  declarations: [PpalBoegueroPage]
})
export class PpalBoegueroPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaPendientePageRoutingModule } from './pagina-pendiente-routing.module';

import { PaginaPendientePage } from './pagina-pendiente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaPendientePageRoutingModule
  ],
  declarations: [PaginaPendientePage]
})
export class PaginaPendientePageModule {}

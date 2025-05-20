import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaPendientePage } from './pagina-pendiente.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaPendientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaPendientePageRoutingModule {}

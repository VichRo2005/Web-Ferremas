import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarSucursalPage } from './listar-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: ListarSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarSucursalPageRoutingModule {}

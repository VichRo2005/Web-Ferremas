import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarCategoriaPage } from './listar-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ListarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarCategoriaPageRoutingModule { }

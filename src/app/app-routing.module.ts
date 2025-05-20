import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'listar-usuario',
    loadComponent: () =>
      import('./pages/listar-usuario/listar-usuario.page').then(m => m.ListarUsuarioPage)
  },
  {
    path: 'listar-productos',
    loadComponent: () =>
      import('./pages/listar-productos/listar-productos.page').then(m => m.ListarProductosPage)
  },
  {
    path: 'listar-categoria',
    loadComponent: () =>
      import('./pages/listar-categoria/listar-categoria.page').then(m => m.ListarCategoriaPage)
  },
  {
    path: 'listar-sucursal',
    loadComponent: () => import('./pages/listar-sucursal/listar-sucursal.page').then(m => m.ListarSucursalPage)
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/catalogo/catalogo.page').then(m => m.CatalogoPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage)
  },  {
    path: 'ppal-boeguero',
    loadChildren: () => import('./pages/ppal-boeguero/ppal-boeguero.module').then( m => m.PpalBoegueroPageModule)
  },
  {
    path: 'bodeguero-listarstock',
    loadChildren: () => import('./pages/bodeguero-listarstock/bodeguero-listarstock.module').then( m => m.BodegueroListarstockPageModule)
  },
  {
    path: 'bodeguero-modificar-stock',
    loadChildren: () => import('./pages/bodeguero-modificar-stock/bodeguero-modificar-stock.module').then( m => m.BodegueroModificarStockPageModule)
  },
  {
    path: 'ecommerce-detalle-carrito',
    loadChildren: () => import('./pages/ecommerce-detalle-carrito/ecommerce-detalle-carrito.module').then( m => m.EcommerceDetalleCarritoPageModule)
  },
  {
    path: 'ecommerce-compra-exitosa',
    loadChildren: () => import('./pages/ecommerce-compra-exitosa/ecommerce-compra-exitosa.module').then( m => m.EcommerceCompraExitosaPageModule)
  },
  {
    path: 'ecommerce-compra-fallida',
    loadChildren: () => import('./pages/ecommerce-compra-fallida/ecommerce-compra-fallida.module').then( m => m.EcommerceCompraFallidaPageModule)
  },
  {
    path: 'pagina-pendiente',
    loadChildren: () => import('./pages/pagina-pendiente/pagina-pendiente.module').then( m => m.PaginaPendientePageModule)
  }






];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
  },
  {
    path: 'ppal-boeguero',
    loadComponent: () => import('./pages/ppal-boeguero/ppal-boeguero.page').then( m => m.PpalBoegueroPage)
  },
  {
    path: 'bodeguero-listarstock',
    loadComponent: () => import('./pages/bodeguero-listarstock/bodeguero-listarstock.page').then( m => m.BodegueroListarstockPage)
  },

  {
    path: 'ecommerce-detalle-carrito',
    loadComponent: () => import('./pages/ecommerce-detalle-carrito/ecommerce-detalle-carrito.page').then( m => m.EcommerceDetalleCarritoPage)
  },
  {
    path: 'ecommerce-compra-exitosa',
    loadComponent: () => import('./pages/ecommerce-compra-exitosa/ecommerce-compra-exitosa.page').then( m => m.EcommerceCompraExitosaPage)
  },
  {
    path: 'ecommerce-compra-fallida',
    loadComponent: () => import('./pages/ecommerce-compra-fallida/ecommerce-compra-fallida.page').then( m => m.EcommerceCompraFallidaPage)
  },
  {
    path: 'pagina-pendiente',
    loadComponent: () => import('./pages/pagina-pendiente/pagina-pendiente.page').then( m => m.PaginaPendientePage)
  }






];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

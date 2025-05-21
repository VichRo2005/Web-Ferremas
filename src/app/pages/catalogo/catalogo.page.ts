import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoService, ProductFromSucursal } from 'src/app/services/catalogo.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';
import { StorageService } from 'src/app/services/storage.service';

import {
  GestionaCarritoService,
  AgregarItemCarrito,
  DetalleCarrito
} from 'src/app/services/gestiona-carrito.service';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss']
})
export class CatalogoPage implements OnInit {
  productos: (ProductFromSucursal & { cantidad?: number })[] = [];
  categorias: any[] = [];
  sucursales: any[] = [];

  searchTerm: string = '';
  categoriaSeleccionada: number | null = null;

  sucursal_id: any;
  usuario_id: any;
  id_carrito: any;



  
  carrito: DetalleCarrito[] = [];

  constructor(
    private catalogoService: CatalogoService,
    private comboBoxService: ComboBoxService,
    private storage: StorageService,
    private carritoService: GestionaCarritoService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.cargarCategorias();
    this.cargarSucursales();

    this.id_carrito = await this.storage.get('id_carrito');
    this.sucursal_id = await this.storage.get('sucursal_id');
    this.usuario_id = await this.storage.get('usuario_id');

    if (this.sucursal_id) {
      this.buscarProductos();
      this.actualizarCarrito();}}



  cargarCategorias() {
    this.comboBoxService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => console.error('Error al cargar categorías')
    });
  }

  cargarSucursales() {
    this.comboBoxService.getSucursales().subscribe({
      next: (data) => this.sucursales = data,
      error: () => console.error('Error al cargar sucursales')
    });
  }

  async cambiarSucursal(id: number) {
  if (!this.id_carrito) return;

  // Desactiva carrito actual
  await this.carritoService.desactivarCarrito(this.id_carrito).toPromise();

  // Obtiene usuario
  const usuario_id = await this.storage.get('usuario_id');

  // Crea nuevo carrito
  this.carritoService.crearCarrito(usuario_id).subscribe({
    next: async (res) => {
      this.id_carrito = res.id_carrito;
      await this.storage.set('id_carrito', this.id_carrito);
      await this.storage.set('sucursal_id', id);
      this.sucursal_id = id;
      this.buscarProductos();
      this.actualizarCarrito();
    },
    error: () => alert('Error al crear nuevo carrito')
  });
}

  buscarProductos() {
  this.catalogoService.getCatalogoPorSucursal(
    this.sucursal_id,
    this.searchTerm,
    this.categoriaSeleccionada ?? undefined
  ).subscribe({
    next: (data) => {
      // Se agrega propiedad "cantidad" por cada producto
      this.productos = data.map(producto => ({
        ...producto,
        cantidad: undefined
      }));
    },
    error: () => this.productos = []
  });
}

  agregarAlCarrito(producto: any) {
  if (!this.id_carrito) return;

  const cantidad = parseInt(producto.cantidad || '0', 10);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, indica una cantidad válida.');
    return;
  }

  const item: AgregarItemCarrito = {
    id_producto: producto.producto_id_producto,
    cantidad,
    id_sucursal: this.sucursal_id
  };

  this.carritoService.agregarProducto(this.id_carrito, item).subscribe(() => {
    this.actualizarCarrito();
    producto.cantidad = null; // limpia input
  });
}


  actualizarCarrito() {
    if (!this.id_carrito) return;

    this.carritoService.obtenerDetalleCarrito(this.id_carrito).subscribe({
      next: (data) => this.carrito = data,
      error: () => this.carrito = []
    });
  }

  mostrarCarrito() {
    let contenido = this.carrito.map(c => `- ${c.nombre_producto} x${c.cantidad}`).join('\n');
    alert('Carrito de compras:\n' + contenido);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoService, ProductFromSucursal } from 'src/app/services/catalogo.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';
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
  productos: ProductFromSucursal[] = [];
  categorias: any[] = [];
  sucursales: any[] = [];

  searchTerm: string = '';
  categoriaSeleccionada: number | null = null;
  sucursalId: number = 1;
  idCarrito: number | null = null;

  
  carrito: DetalleCarrito[] = [];

  constructor(
    private catalogoService: CatalogoService,
    private comboBoxService: ComboBoxService,
    private carritoService: GestionaCarritoService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarSucursales();
    this.buscarProductos();
  }



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

  cambiarSucursal(id: number) {
    this.sucursalId = id;
    this.buscarProductos();
  }

  buscarProductos() {
    this.catalogoService.getCatalogoPorSucursal(
      this.sucursalId,
      this.searchTerm,
      this.categoriaSeleccionada ?? undefined
    ).subscribe({
      next: (data) => this.productos = data,
      error: () => this.productos = []
    });
  }

  agregarAlCarrito(producto: ProductFromSucursal) {
    if (!this.idCarrito) return;

    const item: AgregarItemCarrito = {
      id_producto: producto.id_producto,
      cantidad: 1,
      id_sucursal: this.sucursalId
    };

    this.carritoService.agregarProducto(this.idCarrito, item).subscribe(() => {
      this.actualizarCarrito();
    });
  }

  actualizarCarrito() {
    if (!this.idCarrito) return;

    this.carritoService.obtenerDetalleCarrito(this.idCarrito).subscribe({
      next: (data) => this.carrito = data,
      error: () => this.carrito = []
    });
  }

  mostrarCarrito() {
    let contenido = this.carrito.map(c => `- ${c.nombre_producto} x${c.cantidad}`).join('\n');
    alert('Carrito de compras:\n' + contenido);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { GestionarProductosService, Producto, ProductoCreate } from 'src/app/services/gestionar-productos.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.page.html',
  styleUrls: ['./listar-productos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ListarProductosPage implements OnInit {

  productos: Producto[] = [];
  categorias: any[] = [];

  nuevoProducto: ProductoCreate = {
    categoria_id_categoria: 8,
    nombre_producto: '',
    desc_producto: '',
    precio: 0,
    imagen: '',
    stock_minimo: 0
  };

  constructor(
    private productoService: GestionarProductosService,
    private comboBoxService: ComboBoxService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos() {
    this.productoService.listarProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.mostrarToast('Error al cargar productos')
    });
  }

  cargarCategorias() {
    this.comboBoxService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.mostrarToast('Error al cargar categorías')
    });
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre_producto || !this.nuevoProducto.desc_producto || this.nuevoProducto.precio <= 0) {
      this.mostrarToast('Completa todos los campos obligatorios');
      return;
    }

    this.productoService.agregarProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.mostrarToast('Producto agregado');
        this.nuevoProducto = {
          categoria_id_categoria: 8,
          nombre_producto: '',
          desc_producto: '',
          precio: 0,
          imagen: '',
          stock_minimo: 0
        };
        this.cargarProductos();
      },
      error: () => this.mostrarToast('Error al agregar producto')
    });
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}

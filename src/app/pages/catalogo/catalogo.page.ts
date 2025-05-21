import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoService, ProductFromSucursal } from 'src/app/services/catalogo.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';
import { StorageService } from 'src/app/services/storage.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { DivisaService } from 'src/app/services/divisa.service';



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

  tasaUSD = 0;
  tasaEUR = 0;

  mostrarUSD = false;
  mostrarEUR = false;




  
  carrito: DetalleCarrito[] = [];

  constructor(
    private divisaService: DivisaService,
    private catalogoService: CatalogoService,
    private comboBoxService: ComboBoxService,
    private storage: StorageService,
    private carritoService: GestionaCarritoService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navigation: NavigationService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.divisaService.obtenerTasaCambio().subscribe(rate => {
      this.tasaUSD = rate.usd;
      this.tasaEUR = rate.eur;
    });

    this.id_carrito = await this.storage.get('id_carrito');
    this.sucursal_id = await this.storage.get('sucursal_id');
    this.usuario_id = await this.storage.get('usuario_id');

    this.cargarCategorias();
    this.cargarSucursales();

    if (this.sucursal_id && this.id_carrito) {
      await this.actualizarCarrito(); // <-- esto llama a mostrarCarritoExpirado() si corresponde
      this.buscarProductos();
    }
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
    error: () => this.mostrarAlerta('Error', 'No se pudo crear un nuevo carrito.')
  });
}

async confirmarCambioSucursal(id: number) {
  const alert = await this.alertCtrl.create({
    header: 'Cambio de Sucursal',
    message: 'Cambiar de sucursal desactivará el carrito actual. ¿Deseas continuar?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => this.cambiarSucursal(id)
      }
    ]
  });
  await alert.present();
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
    error: (err) => {
        const mensaje = err.error?.detail || 'Error al obtener productos.';
        this.mostrarAlerta('Error', mensaje);
        this.productos = [];
  }});
}

  agregarAlCarrito(producto: any) {
  if (!this.id_carrito) return;

  const cantidad = parseInt(producto.cantidad || '0', 10);
  if (isNaN(cantidad) || cantidad <= 0) {
    this.mostrarAlerta('Cantidad inválida', 'Por favor, indica una cantidad válida.');
    return;
  }

  const item: AgregarItemCarrito = {
    id_producto: producto.producto_id_producto,
    cantidad,
    id_sucursal: this.sucursal_id
  };

  this.carritoService.agregarProducto(this.id_carrito, item).subscribe({
    next: async () => {
      this.actualizarCarrito();
      producto.cantidad = null;

      const toast = await this.toastCtrl.create({
        message: 'Producto agregado al carrito.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    },
    error: (err) => {
      const detail = err.error?.detail || '';

      if (detail.includes('ha expirado') || detail.includes('no está activo')) {
        this.mostrarCarritoExpirado();
      } else {
        const mensaje = detail || 'Error al agregar producto.';
        this.mostrarAlerta('Error', mensaje);
        this.carrito = [];
      }
    }
  });
}



  actualizarCarrito() {
    if (!this.id_carrito) return;

    this.carritoService.obtenerDetalleCarrito(this.id_carrito).subscribe({
      next: (data) => this.carrito = data,
      error: (err) => {
      const detail = err.error?.detail || '';

      if (detail.includes('ha expirado') || detail.includes('no está activo')) {
        this.mostrarCarritoExpirado();
      } else {
        this.carrito = [];
      }
          }});
  }


  mostrarCarrito() {
  this.navigation.goTo('/ecommerce-detalle-carrito');
}


  async mostrarCarritoExpirado() {
  const alert = await this.alertCtrl.create({
    header: 'Carrito vencido',
    message: 'Tu carrito ha expirado. ¿Deseas crear uno nuevo o volver al login?',
    buttons: [
      {
        text: 'Login',
        handler: async () => {
          await this.storage.clear(); // ⬅️ Limpia todos los datos temporales
          this.navigation.goTo('/login');
        }
      },
      {
        text: 'Nuevo Carrito',
        handler: () => this.cambiarSucursal(this.sucursal_id)
      }
    ]
  });
  await alert.present();
}


async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: async () => {
            if (this.id_carrito) {
              await this.carritoService.desactivarCarrito(this.id_carrito).toPromise().catch(() => {});
            }
            await this.storage.clear();
            this.navigation.goTo('/login');
          }
        }
      ]
    });
    await alert.present();
  }

  convertirUSD(valorCLP: number): string {
    return this.tasaUSD > 0 ? '$' + (valorCLP * this.tasaUSD).toFixed(2) : '...';
  }

  convertirEUR(valorCLP: number): string {
    return this.tasaEUR > 0 ? '€' + (valorCLP * this.tasaEUR).toFixed(2) : '...';
  }
  


}

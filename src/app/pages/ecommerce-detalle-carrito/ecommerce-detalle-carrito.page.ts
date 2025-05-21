import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { GestionaCarritoService } from 'src/app/services/gestiona-carrito.service';
import { StorageService } from 'src/app/services/storage.service';
import { DetalleCarrito } from 'src/app/services/gestiona-carrito.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-ecommerce-detalle-carrito',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-detalle-carrito.page.html',
  styleUrls: ['./ecommerce-detalle-carrito.page.scss'],
})
export class EcommerceDetalleCarritoPage implements OnInit {

  id_carrito: any;

  carrito: DetalleCarrito[] = [];

  constructor(
    private storage: StorageService,
    private carritoService: GestionaCarritoService,
    private alertCtrl: AlertController,
    private navigation: NavigationService
  ) { }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    this.id_carrito = await this.storage.get('id_carrito');
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.carritoService.obtenerDetalleCarrito(this.id_carrito).subscribe({
      next: data => this.carrito = data,
      error: err => console.error(err)
    });
  }

  eliminarProducto(id_producto: number) {
    this.carritoService.eliminarProducto(this.id_carrito, id_producto).subscribe(() => {
      this.obtenerCarrito();
    });
  }

  procesarCompra() {
    // Aquí rediriges o llamas al método correspondiente en tu API
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


  volverAlCatalogo() {
    this.navigation.goTo('/catalogo');
  }

}

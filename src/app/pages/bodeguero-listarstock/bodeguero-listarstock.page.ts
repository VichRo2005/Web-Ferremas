import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController,  } from '@ionic/angular';
import { GestionBodegueroService, StockProductoOut } from 'src/app/services/gestion-bodeguero.service';
import { StorageService } from 'src/app/services/storage.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-bodeguero-listarstock',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './bodeguero-listarstock.page.html',
  styleUrls: ['./bodeguero-listarstock.page.scss'],
})
export class BodegueroListarstockPage implements OnInit {

  stock: StockProductoOut[] = [];
  user_id : any;
  cantidades: { [id: number]: number } = {};

  constructor(
    private gestionBodegueroService: GestionBodegueroService,
    private toastController: ToastController,
    private storage: StorageService,
    private navigation: NavigationService,
    private alertCtrl: AlertController

  ) { }

  async ngOnInit() {
    this.user_id = await this.storage.get('usuario_id');
    this.cargarStock();

  }

  cargarStock() {
    this.gestionBodegueroService.listarStock(this.user_id).subscribe({
      next: (data) => this.stock = data,
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Error al cargar el stock',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }


  async actualizarCantidad(producto: StockProductoOut) {
    const alert = await this.alertCtrl.create({
      header: `Actualizar Stock - ${producto.nombre_producto}`,
      inputs: [
        {
          name: 'nuevaCantidad',
          type: 'number',
          placeholder: 'Nueva cantidad',
          min: 0
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: async (data) => {
            const nuevaCantidad = parseInt(data.nuevaCantidad, 10);
            if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
              const toast = await this.toastController.create({
                message: 'Cantidad inválida',
                duration: 2000,
                color: 'warning'
              });
              toast.present();
              return;
            }

            this.gestionBodegueroService.actualizarStock(
              this.user_id, producto.producto_id_producto, nuevaCantidad
            ).subscribe({
              next: async () => {
                const toast = await this.toastController.create({
                  message: 'Stock actualizado correctamente',
                  duration: 2000,
                  color: 'success'
                });
                toast.present();
                this.cargarStock(); // Refrescar lista
              },
              error: async () => {
                const toast = await this.toastController.create({
                  message: 'Error al actualizar stock',
                  duration: 2000,
                  color: 'danger'
                });
                toast.present();
              }
            });
          }
        }
      ]
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
            await this.storage.clear();
            this.navigation.goTo('/login');
          }
        }
      ]
    });
    await alert.present();
  }
}

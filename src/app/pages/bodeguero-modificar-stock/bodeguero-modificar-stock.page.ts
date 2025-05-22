import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, ActionSheetController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GestionBodegueroService, StockProductoOut } from 'src/app/services/gestion-bodeguero.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-bodeguero-modificar-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './bodeguero-modificar-stock.page.html',
  styleUrls: ['./bodeguero-modificar-stock.page.scss'],
})
export class BodegueroModificarStockPage implements OnInit {
  user_id: number | null = null;
  arregloStock: StockProductoOut[] = [];
  cantidades: { [id_producto: number]: number } = {};

  constructor(
    private gestionBodegueroService: GestionBodegueroService,
    private storageService: StorageService,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async ngOnInit() {
    const user = await this.storageService.get('userData');
    this.user_id = user?.id;
    this.cargarStock();
  }

  cargarStock() {
    if (this.user_id) {
      this.gestionBodegueroService.listarStock(this.user_id).subscribe({
        next: (res) => {
          this.arregloStock = res;
          res.forEach(prod => this.cantidades[prod.id_producto] = prod.cantidad_actual);
        },
        error: () => this.presentToast('Error al cargar stock', 'danger')
      });
    }
  }

  async presentActionSheet(producto: StockProductoOut) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Opciones para ${producto.producto}`,
      buttons: [
        {
          text: 'Modificar cantidad',
          icon: 'create',
          handler: () => this.actualizarStock(producto.id_producto)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async actualizarStock(id_producto: number) {
    if (this.user_id && this.cantidades[id_producto] !== undefined) {
      const nueva = this.cantidades[id_producto];
      this.gestionBodegueroService
        .actualizarStock(this.user_id, id_producto, nueva)
        .subscribe({
          next: async () => this.presentToast('Stock actualizado correctamente', 'success'),
          error: async () => this.presentToast('Error al actualizar el stock', 'danger')
        });
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({ message, duration: 2000, color });
    toast.present();
  }
}

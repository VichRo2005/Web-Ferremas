import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { GestionBodegueroService, StockProductoOut } from 'src/app/services/gestion-bodeguero.service';
import { ModificarCantidadPage } from '../modificar-cantidad/modificar-cantidad.page'; 

@Component({
  selector: 'app-bodeguero-modificar-stock',
  templateUrl: './bodeguero-modificar-stock.page.html',
  styleUrls: ['./bodeguero-modificar-stock.page.scss'],
})
export class BodegueroModificarStockPage implements OnInit {
  user_id: number = 0;
  searchTerm: string = '';
  arregloStock: StockProductoOut[] = [];
  filteredStock: StockProductoOut[] = [];

  constructor(
    private storageService: StorageService,
    private gestionBodeguero: GestionBodegueroService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.cargarUserId();
  }

  async cargarUserId() {
    try {
      const user = await this.storageService.get('userData'); // Cambiado aquí
      this.user_id = user.id;
      this.cargarStock();
    } catch (err) {
      this.presentToast('Error al cargar el usuario', 'danger');
    }
  }

  cargarStock() {
    this.gestionBodeguero.listarStock(this.user_id).subscribe({
      next: (res) => {
        this.arregloStock = res;
        this.filteredStock = res;
      },
      error: () => this.presentToast('Error al cargar stock', 'danger'),
    });
  }

  buscarProductos() {
    if (this.searchTerm.trim() === '') {
      this.filteredStock = this.arregloStock;
    } else {
      this.filteredStock = this.arregloStock.filter((prod) =>
        prod.producto.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  async presentActionSheet(producto: StockProductoOut) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar cantidad',
          handler: () => this.abrirModalModificar(producto),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async abrirModalModificar(producto: StockProductoOut) {
    const modal = await this.modalController.create({
      component: ModificarCantidadPage,
      componentProps: { producto, user_id: this.user_id },
    });
    modal.onDidDismiss().then(() => this.cargarStock());
    await modal.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({ message, duration: 2000, color });
    toast.present();
  }
}

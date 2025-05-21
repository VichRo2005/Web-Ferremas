import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { GestionBodegueroService, StockProductoOut } from 'src/app/services/gestion-bodeguero.service';

@Component({
  selector: 'app-bodeguero-listarstock',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './bodeguero-listarstock.page.html',
  styleUrls: ['./bodeguero-listarstock.page.scss'],
})
export class BodegueroListarstockPage implements OnInit {

  stock: StockProductoOut[] = [];
  user_id = 1;
  cantidades: { [id: number]: number } = {};

  constructor(
    private gestionBodegueroService: GestionBodegueroService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarStock();
  }

  cargarStock() {
    this.gestionBodegueroService.listarStock(this.user_id).subscribe({
      next: (data) => {
        this.stock = data;
        this.stock.forEach(prod => {
          this.cantidades[prod.id_producto] = prod.cantidad_actual;
        });
      },
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

  async actualizarCantidad(id_producto: number) {
    const nuevaCantidad = this.cantidades[id_producto];
    this.gestionBodegueroService.actualizarStock(this.user_id, id_producto, nuevaCantidad).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Stock actualizado',
          duration: 2000,
          color: 'success'
        });
        toast.present();
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

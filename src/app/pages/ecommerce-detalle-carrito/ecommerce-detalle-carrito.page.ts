import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ecommerce-detalle-carrito',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-detalle-carrito.page.html',
  styleUrls: ['./ecommerce-detalle-carrito.page.scss'],
})
export class EcommerceDetalleCarritoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

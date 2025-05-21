import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ecommerce-compra-fallida',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-compra-fallida.page.html',
  styleUrls: ['./ecommerce-compra-fallida.page.scss'],
})
export class EcommerceCompraFallidaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

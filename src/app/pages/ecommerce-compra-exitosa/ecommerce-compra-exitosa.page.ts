import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ecommerce-compra-exitosa',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-compra-exitosa.page.html',
  styleUrls: ['./ecommerce-compra-exitosa.page.scss'],
})
export class EcommerceCompraExitosaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

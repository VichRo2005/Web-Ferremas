import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bodeguero-modificar-stock',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './bodeguero-modificar-stock.page.html',
  styleUrls: ['./bodeguero-modificar-stock.page.scss'],
})
export class BodegueroModificarStockPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

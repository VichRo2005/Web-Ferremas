import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bodeguero-listarstock',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './bodeguero-listarstock.page.html',
  styleUrls: ['./bodeguero-listarstock.page.scss'],
})
export class BodegueroListarstockPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

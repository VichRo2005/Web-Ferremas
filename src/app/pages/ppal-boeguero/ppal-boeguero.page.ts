import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ppal-boeguero',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ppal-boeguero.page.html',
  styleUrls: ['./ppal-boeguero.page.scss'],
})
export class PpalBoegueroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-pendiente',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './pagina-pendiente.page.html',
  styleUrls: ['./pagina-pendiente.page.scss'],
})
export class PaginaPendientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-pagina-pendiente',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './pagina-pendiente.page.html',
  styleUrls: ['./pagina-pendiente.page.scss'],
})
export class PaginaPendientePage implements OnInit {

  constructor(
    private storage: StorageService,
    private navigation: NavigationService
  ) {}

  async volverAlInicio() {
    await this.storage.remove('usuario_id');
    await this.storage.remove('tipo_usuario');
    this.navigation.goTo('/login');
  }


  ngOnInit() {
  }

  async limpiarTodo() {
  await this.storage.clear(); // Limpia todo Ionic Storage
  localStorage.clear();       // Limpia localStorage por si acaso
  this.navigation.goTo('/login');
}

}

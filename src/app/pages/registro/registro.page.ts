import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage {
  usuario = {
    correo: '',
    password: '',
    p_nombre: '',
    s_nombre: '',
    a_paterno: '',
    a_materno: '',
    comuna_id: null,
    direccion: '',
    telefono: ''
  };

  constructor(
    private gestionUsuarios: GestionUsuariosService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  registrarUsuario() {
    this.gestionUsuarios.register(this.usuario).subscribe({
      next: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.error.detail || 'No se pudo registrar el usuario.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}

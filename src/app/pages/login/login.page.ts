// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from 'src/app/services/navigation.service';
import { StorageService } from 'src/app/services/storage.service';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo = '';
  password = '';
  error = '';

  constructor(
    private gestionUsuarios: GestionUsuariosService,
    private navigation: NavigationService,
    private storage: StorageService
  ) { }

  login(form: NgForm) {
    if (!form.valid) {
      this.error = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.gestionUsuarios.login(this.correo, this.password).subscribe({
      next: (res) => {
        this.storage.set('usuario_id', res.id_usuario);
        this.storage.set('tipo_usuario', res.tipo_usuario_id_tip_user);

        switch (res.tipo_usuario_id_tip_user) {
          case 1:
            this.navigation.goTo('/admin');
            break;
          case 2:
            this.navigation.goTo('/bodeguero');
            break;
          case 3:
            this.navigation.goTo('/vendedor');
            break;
          case 4:
            this.navigation.goTo('/contador');
            break;
          default:
            this.navigation.goTo('/login');
            break;
        }
      },
      error: (err) => {
        this.error = err.error.detail || 'Error al iniciar sesión';
      }
    });
  }

  entrarComoVisita() {
    this.gestionUsuarios.createTemporaryUser().subscribe({
      next: (res) => {
        this.storage.set('usuario_id', res.user_id);
        this.storage.set('tipo_usuario', 'visitante');
        this.navigation.goTo('/home');
      },
      error: () => {
        this.error = 'No se pudo crear un usuario temporal';
      }
    });
  }

  recuperarContrasena() {
    this.navigation.goTo('/recuperar-password');
  }
}

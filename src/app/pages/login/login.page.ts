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
  isCooldown: boolean = false;
  intentoLogin: number = 0;
  cooldownTimer: any;

  constructor(
    private gestionUsuarios: GestionUsuariosService,
    private navigation: NavigationService,
    private storage: StorageService
  ) { }

  login(form: NgForm) {
    this.error = '';

    if (!form.valid) {
      this.error = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const partesCorreo = this.correo.split('@');
    const tieneArrobaYPunto = this.correo.includes('@') && this.correo.includes('.');
    const tieneTextoAntes = partesCorreo[0]?.match(/[a-zA-Z0-9]/); // al menos una letra o número antes del @

    if (!tieneArrobaYPunto || !tieneTextoAntes) {
      this.error = 'El correo debe tener un formato válido (ej: usuario@dominio.com).';
      return;}

    if (!this.password.trim()) {
      this.error = 'La contraseña no puede estar vacía.';
      return;
    }    

    if (this.isCooldown) {
      this.error = 'Demasiados intentos fallidos. Espera 20 segundos.';
      return;
    }

    this.gestionUsuarios.login(this.correo, this.password).subscribe({
      next: (res) => {
        this.intentoLogin = 0;
        clearTimeout(this.cooldownTimer);

        this.storage.set('usuario_id', res.id_usuario);
        this.storage.set('tipo_usuario', res.tipo_usuario_id_tip_user);

        switch (res.tipo_usuario_id_tip_user) {
          case 1: //cliente
            this.navigation.goTo('/cliente');
            break;
          case 3: //administrador
            this.navigation.goTo('/pagina-pendiente');
            break;
          case 4: //vendedor
            this.navigation.goTo('/pagina-pendiente');
            break;
          case 5: //bodeguero
            this.navigation.goTo('/bodeguero');
            break;
          case 6: //contador
            this.navigation.goTo('/pagina-pendiente');
            break;
          default:
            this.navigation.goTo('/login');
            break;
        }
      },
      error: (err) => {
        this.intentoLogin++;

        if (this.intentoLogin >= 3) {
          this.isCooldown = true;
          this.error = 'Demasiados intentos fallidos. Espera 20 segundos.';
          this.cooldownTimer = setTimeout(() => {
            this.isCooldown = false;
            this.intentoLogin = 0;
          }, 20000); // 20 segundos
        } else {
          this.error = err.error.detail || 'Correo o contraseña incorrectos.';
        }
      }
    });
  }

  /*
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

  */
}

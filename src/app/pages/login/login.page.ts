import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from 'src/app/services/navigation.service';
import { StorageService } from 'src/app/services/storage.service';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { GestionaCarritoService } from 'src/app/services/gestiona-carrito.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';

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
    private gestionaCarrito: GestionaCarritoService,
    private comboBox: ComboBoxService,
    private navigation: NavigationService,
    private storage: StorageService,
    private alertController: AlertController
  ) {}

   // 👇 AÑADE ESTE MÉTODO
  async ionViewWillEnter() {
    const id_carrito = await this.storage.get('id_carrito');
    if (id_carrito) {
      try {
        await this.gestionaCarrito.desactivarCarrito(id_carrito).toPromise();
      } catch (e) {
        console.warn('No se pudo desactivar el carrito', e);
      }
    }
    await this.storage.clear();
  }

  async mostrarSelectorSucursalPopup(sucursales: any[]) {
    const alert = await this.alertController.create({
      header: 'Seleccione una sucursal',
      inputs: sucursales.map((sucursal) => ({
        type: 'radio',
        label: `Región: ${sucursal.desc_region} - ${sucursal.desc_comuna} - ${sucursal.direccion_sucursal}`,
        value: sucursal.id_sucursal
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.error = 'Debe seleccionar una sucursal para continuar.';
          }
        },
        {
          text: 'Aceptar',
          handler: async (sucursal_id: number) => {
            const usuario_id = await this.storage.get('usuario_id');
            await this.storage.set('sucursal_id', sucursal_id);

            this.gestionaCarrito.crearCarrito(usuario_id).subscribe({
              next: (res) => {
                this.storage.set('id_carrito', res.id_carrito);
                this.navigation.goTo('/catalogo');
              },
              error: () => {
                this.error = 'Error al crear carrito';
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  login(form: NgForm) {
    this.error = '';

    if (!form.valid) {
      this.error = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const partesCorreo = this.correo.split('@');
    const tieneArrobaYPunto = this.correo.includes('@') && this.correo.includes('.');
    const tieneTextoAntes = partesCorreo[0]?.match(/[a-zA-Z0-9]/);

    if (!tieneArrobaYPunto || !tieneTextoAntes) {
      this.error = 'El correo debe tener un formato válido (ej: usuario@dominio.com).';
      return;
    }

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
          case 1: // Cliente
            this.comboBox.getSucursales().subscribe({
              next: (sucursales) => {
                this.mostrarSelectorSucursalPopup(sucursales);
              },
              error: () => {
                this.error = 'No se pudieron cargar las sucursales.';
              }
            });
            break;
          case 3: // Administrador
            this.navigation.goTo('/pagina-pendiente');
            break;
          case 4: // Vendedor
            this.navigation.goTo('/pagina-pendiente');
            break;

          case 6: // Contador
            this.navigation.goTo('/pagina-pendiente');
            break;
          case 5: // Bodeguero
            this.navigation.goTo('/bodeguero');
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
          }, 20000);
        } else {
          this.error = err.error.detail || 'Correo o contraseña incorrectos.';
        }
      }
    });
  }
}

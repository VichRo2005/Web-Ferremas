import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss']
})
export class ListarUsuarioPage implements OnInit {

  usuarios: any[] = [];

  usuarioForm: {
    id_usuario: number | null;
    nombre: string;
    correo: string;
    password: string;
    tipo_usuario: string;
  } = {
      id_usuario: null,
      nombre: '',
      correo: '',
      password: '',
      tipo_usuario: ''
    };

  modoEditar = false;

  constructor(
    private adminService: AdministracionService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.adminService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        this.mostrarToast('Error al obtener la lista de usuarios');
        console.error(err);
      }
    });
  }

  prepararFormularioCrear() {
    this.usuarioForm = {
      id_usuario: null,
      nombre: '',
      correo: '',
      password: '',
      tipo_usuario: ''
    };
    this.modoEditar = false;
  }

  prepararFormularioEditar(usuario: any) {
    this.usuarioForm = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: '',
      tipo_usuario: usuario.tipo_usuario
    };
    this.modoEditar = true;
  }

  guardarUsuario() {
    if (!this.usuarioForm.nombre || !this.usuarioForm.correo || !this.usuarioForm.tipo_usuario || (!this.modoEditar && !this.usuarioForm.password)) {
      this.mostrarToast('Todos los campos son obligatorios');
      return;
    }

    if (this.modoEditar && this.usuarioForm.id_usuario !== null) {
      const id_actual = 1;
      this.adminService.editarUsuario(this.usuarioForm.id_usuario, this.usuarioForm, id_actual).subscribe({
        next: () => {
          this.mostrarToast('Usuario editado correctamente');
          this.prepararFormularioCrear();
          this.cargarUsuarios();
        },
        error: (err) => {
          this.mostrarToast('Error al editar usuario');
          console.error(err);
        }
      });
    } else {
      this.adminService.crearCuenta(this.usuarioForm).subscribe({
        next: () => {
          this.mostrarToast('Usuario creado correctamente');
          this.prepararFormularioCrear();
          this.cargarUsuarios();
        },
        error: (err) => {
          this.mostrarToast('Error al crear usuario');
          console.error(err);
        }
      });
    }
  }

  async confirmarEliminar(correo: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Seguro que deseas eliminar el usuario <strong>${correo}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => this.eliminarUsuario(correo) }
      ]
    });
    await alert.present();
  }

  eliminarUsuario(correo: string) {
    this.adminService.eliminarUsuario(correo).subscribe({
      next: () => {
        this.mostrarToast('Usuario eliminado correctamente');
        this.cargarUsuarios();
      },
      error: (err) => {
        this.mostrarToast('Error al eliminar usuario');
        console.error(err);
      }
    });
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}


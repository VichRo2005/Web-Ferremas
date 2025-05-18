// src/app/pages/listar-usuario/listar-usuario.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { AdministracionService } from 'src/app/services/administracion.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss']
})
export class ListarUsuarioPage implements OnInit {

  usuarios: any[] = [];

  regiones: any[] = [];
  comunas: any[] = [];
  tiposUsuario: any[] = [];
  sucursales: any[] = [];

  usuarioForm = {
    id_usuario: null as number | null,
    p_nombre: '',
    s_nombre: '',
    a_paterno: '',
    a_materno: '',
    rut_usuario: '',
    correo: '',
    telefono: '',
    direccion: '',
    comuna: '',
    tipo_usuario: '',
    sucursal_id: ''
  };

  modoEditar = false;

  constructor(
    private adminService: AdministracionService,
    private comboBoxService: ComboBoxService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarCombos();
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

  cargarCombos() {
    this.comboBoxService.getRegiones().subscribe(data => this.regiones = data);
    this.comboBoxService.getTiposUsuario().subscribe(data => this.tiposUsuario = data);
    this.comboBoxService.getSucursales().subscribe(data => this.sucursales = data);
  }

  // ✅ Correcto uso del parámetro regionId
  onRegionSelected(regionId: number) {
    this.usuarioForm.comuna = '';
    this.comunas = [];

    if (regionId) {
      this.comboBoxService.getComunas(regionId).subscribe(data => {
        this.comunas = data;
      });
    }
  }

  prepararFormularioCrear() {
    this.usuarioForm = {
      id_usuario: null,
      p_nombre: '',
      s_nombre: '',
      a_paterno: '',
      a_materno: '',
      rut_usuario: '',
      correo: '',
      telefono: '',
      direccion: '',
      comuna: '',
      tipo_usuario: '',
      sucursal_id: ''
    };
    this.comunas = [];
    this.modoEditar = false;
  }

  prepararFormularioEditar(usuario: any) {
    this.usuarioForm = {
      id_usuario: usuario.id_usuario,
      p_nombre: usuario.p_nombre,
      s_nombre: usuario.s_nombre,
      a_paterno: usuario.a_paterno,
      a_materno: usuario.a_materno,
      rut_usuario: usuario.rut_usuario,
      correo: usuario.correo,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      comuna: usuario.comuna,
      tipo_usuario: usuario.tipo_usuario,
      sucursal_id: usuario.sucursal_id
    };
    this.modoEditar = true;
  }

  guardarUsuario() {
    const camposObligatorios = [
      'p_nombre', 'a_paterno', 'rut_usuario', 'correo',
      'telefono', 'direccion', 'comuna', 'tipo_usuario', 'sucursal_id'
    ];

    for (const campo of camposObligatorios) {
      if (!(this.usuarioForm as any)[campo]) {
        this.mostrarToast(`El campo ${campo} es obligatorio`);
        return;
      }
    }

    if (this.modoEditar && this.usuarioForm.id_usuario !== null) {
      const id_actual = 1; // Reemplaza con el ID real si es necesario
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { GestionarSucursalService, Sucursal } from 'src/app/services/gestionar-sucursal.service';
import { ComboBoxService } from 'src/app/services/combo-box.service';

@Component({
  selector: 'app-listar-sucursal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './listar-sucursal.page.html',
  styleUrls: ['./listar-sucursal.page.scss']
})
export class ListarSucursalPage implements OnInit {
  sucursales: Sucursal[] = [];
  regiones: any[] = [];
  comunas: any[] = [];

  nuevaSucursal: {
    id_sucursal: number | null;
    direccion: string;
    estado_sucursal: number;
    region_id: number | null;
    comuna_id: number | null;
    nombre_region: string;
    nombre_comuna: string;
  } = {
    id_sucursal: null,
    direccion: '',
    estado_sucursal: 1,
    region_id: null,
    comuna_id: null,
    nombre_region: '',
    nombre_comuna: ''
  };

  mostrarFormulario = false;
  id_actual = 1;

  constructor(
    private sucursalService: GestionarSucursalService,
    private comboBox: ComboBoxService
  ) {}

  ngOnInit() {
    this.cargarSucursales();
    this.comboBox.getRegiones().subscribe(data => this.regiones = data);
  }

  cargarSucursales() {
    this.sucursalService.getSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }

  abrirFormulario() {
    this.nuevaSucursal = {
      id_sucursal: null,
      direccion: '',
      estado_sucursal: 1,
      region_id: null,
      comuna_id: null,
      nombre_region: '',
      nombre_comuna: ''
    };
    this.mostrarFormulario = true;
  }

  seleccionarRegion(regionId: number) {
    if (regionId !== null) {
      this.nuevaSucursal.region_id = regionId;
      const region = this.regiones.find(r => r.id_region === regionId);
      this.nuevaSucursal.nombre_region = region?.nombre_region || '';
      this.comboBox.getComunas(regionId).subscribe(data => {
        this.comunas = data;
      });
    }
  }

  seleccionarComuna(comunaId: number) {
    if (comunaId !== null) {
      this.nuevaSucursal.comuna_id = comunaId;
      const comuna = this.comunas.find(c => c.id_comuna === comunaId);
      this.nuevaSucursal.nombre_comuna = comuna?.nombre_comuna || '';
    }
  }

  guardarSucursal() {
    if (this.nuevaSucursal.comuna_id !== null && this.nuevaSucursal.id_sucursal !== null) {
      const data = {
        id_sucursal: this.nuevaSucursal.id_sucursal,
        direccion: this.nuevaSucursal.direccion,
        estado_sucursal: this.nuevaSucursal.estado_sucursal,
        telefono: 'Sin teléfono',
        nombre_sucursal: 'Sucursal nueva',
        id_comuna: this.nuevaSucursal.comuna_id
      };

      this.sucursalService.crearSucursal(data, this.id_actual).subscribe(() => {
        this.cargarSucursales();
        this.mostrarFormulario = false;
      });
    }
  }
}

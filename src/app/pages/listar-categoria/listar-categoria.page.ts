import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ActionSheetController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GestionCategoriaService, Categoria } from 'src/app/services/gestion-categoria.service';

@Component({
  selector: 'app-listar-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ],
  templateUrl: './listar-categoria.page.html',
  styleUrls: ['./listar-categoria.page.scss']
})
export class ListarCategoriaPage implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: GestionCategoriaService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  async agregarCategoria() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Categoría',
      inputs: [
        {
          name: 'desc_categoria',
          type: 'text',
          placeholder: 'Descripción de la categoría'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const desc = data.desc_categoria?.trim();
            if (!desc) {
              return false; // Cancelar si está vacío
            }
            const nuevaCategoria = {
              desc_categoria: desc,
              estado_categoria: 1
            };
            this.categoriaService.crearCategoria(nuevaCategoria).subscribe(() => {
              this.cargarCategorias();
            });
            return true; // ✅ Esto soluciona el error TS7030
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarOpciones(categoria: Categoria) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar',
          handler: () => this.modificarCategoria(categoria)
        },
        {
          text: 'Eliminar',
          handler: () => this.confirmarEliminar(categoria.id_categoria)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async confirmarEliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas eliminar esta categoría?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.categoriaService.eliminarCategoria(id).subscribe(() => {
              this.cargarCategorias();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async modificarCategoria(categoria: Categoria) {
    const alert = await this.alertCtrl.create({
      header: 'Modificar Categoría',
      inputs: [
        {
          name: 'desc_categoria',
          type: 'text',
          value: categoria.desc_categoria,
          placeholder: 'Descripción de la categoría'
        },
        {
          name: 'estado_categoria',
          type: 'number',
          value: categoria.estado_categoria,
          placeholder: 'Estado (1=activo, 0=inactivo)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const updated = {
              desc_categoria: data.desc_categoria?.trim(),
              estado_categoria: Number(data.estado_categoria)
            };
            this.categoriaService.actualizarCategoria(categoria.id_categoria, updated).subscribe(() => {
              this.cargarCategorias();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}

// src/app/services/gestionar-productos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id_producto: number;
  categoria_id_categoria: number;
  nombre_producto: string;
  desc_producto: string;
  precio: number;
  estado_producto: number;
  imagenOut: string;  // Imagen base64 desde backend
  stock_minimo: number;
  desc_categoria: string;
}

export interface ProductoCreate {
  categoria_id_categoria: number;
  nombre_producto: string;
  desc_producto: string;
  precio: number;
  imagen: string; // base64
  stock_minimo: number;
}

export interface ProductoUpdate extends ProductoCreate { }

@Injectable({
  providedIn: 'root'
})
export class GestionarProductosService {

  private API_URL = 'http://localhost:8000/productos'; // Ajusta si usas prefijo distinto

  constructor(private http: HttpClient) { }

  // 🔹 Obtener todos los productos
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/listar`);
  }

  // 🔹 Crear nuevo producto
  agregarProducto(data: ProductoCreate): Observable<any> {
    return this.http.post(`${this.API_URL}/crear`, data);
  }

  // 🔹 Editar producto
  actualizarProducto(id_producto: number, data: ProductoUpdate): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizar/${id_producto}`, data);
  }

  // 🔹 Eliminar producto (desactivar)
  eliminarProducto(id_producto: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar/${id_producto}`);
  }
}


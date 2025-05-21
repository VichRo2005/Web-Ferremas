// src/app/services/combo-box.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxService {

  private BASE_URL = 'http://localhost:8000/api/combobox';

  constructor(private http: HttpClient) { }

  // Obtener regiones
  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/regiones`);
  }

  // Obtener comunas filtradas por region_id
  getComunas(regionId: number): Observable<any[]> {
    const params = new HttpParams().set('region_id', regionId.toString());
    return this.http.get<any[]>(`${this.BASE_URL}/comunas`, { params });
  }

  // Obtener tipos de usuario
  getTiposUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/usuarios/tipos`);
  }

  // Obtener sucursales activas
  getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/sucursales`);
  }

  // Obtener todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/productos`);
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/categorias`);
  }

  // Obtener tipos de movimiento
  getTiposMovimiento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/movimientos`);
  }

  // Obtener tipos de despacho
  getTiposDespacho(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/despacho/tipos`);
  }

  // Obtener estados de despacho
  getEstadosDespacho(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/despacho/estados`);
  }

  // Obtener tipos de comprobantes
  getTiposComprobante(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/comprobantes/tipos`);
  }
}

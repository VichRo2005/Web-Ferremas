import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sucursal {
  id_sucursal: number;
  direccion: string;
  estado_sucursal: number;
  telefono: string;
  nombre_sucursal: string;
  comuna_id_comuna: number;

  // ✅ Opcionales si vienen del backend
  nombre_comuna?: string;
  nombre_region?: string;
}

export interface SucursalCreate {
  direccion: string;
  estado_sucursal: number;
  telefono: string;
  nombre_sucursal: string;
  id_comuna: number;
}

export interface SucursalUpdate {
  direccion?: string;
  estado_sucursal?: number;
  telefono?: string;
  nombre_sucursal?: string;
  id_comuna?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestionarSucursalService {

  private BASE_URL = 'http://localhost:8000/crudsucursales/admin/sucursales';

  constructor(private http: HttpClient) { }

  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.BASE_URL);
  }

  crearSucursal(data: SucursalCreate, id_actual: number): Observable<any> {
    const params = new HttpParams().set('id_actual', id_actual.toString());
    return this.http.post<any>(this.BASE_URL, data, { params });
  }

  eliminarSucursal(id_sucursal: number, id_actual: number): Observable<any> {
    const params = new HttpParams().set('id_actual', id_actual.toString());
    return this.http.delete<any>(`${this.BASE_URL}/${id_sucursal}`, { params });
  }

  actualizarSucursal(id_sucursal: number, data: SucursalUpdate, id_actual: number): Observable<any> {
    const params = new HttpParams().set('id_actual', id_actual.toString());
    return this.http.put<any>(`${this.BASE_URL}/${id_sucursal}`, data, { params });
  }
}

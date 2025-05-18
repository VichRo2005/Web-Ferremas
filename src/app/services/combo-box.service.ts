// src/app/services/combo-box.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxService {

  private BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Obtener regiones
  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/regiones`);
  }

  // ✅ Obtener comunas filtradas por region_id
  getComunas(regionId: number): Observable<any[]> {
    const params = new HttpParams().set('region_id', regionId.toString());
    return this.http.get<any[]>(`${this.BASE_URL}/comunas`, { params });
  }

  // Obtener tipos de usuario
  getTiposUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/tipos_usuario`);
  }

  // Obtener sucursales activas
  getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/sucursales`);
  }
}

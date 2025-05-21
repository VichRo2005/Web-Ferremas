import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DespachoOut {
  id_despacho: number;
  estado: string;
  fecha: string;
  direccion: string;
  // Añade más campos si tu modelo lo requiere
}

export interface DetalleComprobanteOut {
  producto: string;
  cantidad: number;
  precio_unitario: number;
  // Añade más campos si tu modelo lo requiere
}

export interface StockProductoOut {
  id_producto: number;             // ✅ Campo necesario para actualizar stock
  producto: string;
  cantidad_actual: number;
  stock_minimo: number;
}

export interface ActualizarEstadoIn {
  id_estado_despacho: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestionBodegueroService {

  private BASE_URL = 'http://localhost:8000/bodeguero';

  constructor(private http: HttpClient) { }

  // 1. Listar despachos por sucursal
  listarDespachos(user_id: number): Observable<DespachoOut[]> {
    return this.http.get<DespachoOut[]>(`${this.BASE_URL}/despachos/?user_id=${user_id}`);
  }

  // 2. Ver detalle del comprobante
  obtenerDetalleComprobante(user_id: number, id_comprobante: number): Observable<DetalleComprobanteOut[]> {
    return this.http.get<DetalleComprobanteOut[]>(
      `${this.BASE_URL}/detalle-comprobante/${id_comprobante}?user_id=${user_id}`
    );
  }

  // 3. Asignar despacho
  asignarDespacho(user_id: number, id_despacho: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/asignar-despacho/${id_despacho}?user_id=${user_id}`, {});
  }

  // 4. Cambiar estado del despacho
  actualizarEstadoDespacho(user_id: number, id_despacho: number, id_estado_despacho: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/estado-despacho/${id_despacho}?user_id=${user_id}`, {
      id_estado_despacho
    });
  }

  // 5. Listar stock por sucursal
  listarStock(user_id: number): Observable<StockProductoOut[]> {
    return this.http.get<StockProductoOut[]>(`${this.BASE_URL}/stock/?user_id=${user_id}`);
  }

  // 6. Actualizar stock
  actualizarStock(user_id: number, producto_id_producto: number, nueva_cantidad: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/updatestock/${user_id}/${producto_id_producto}/${nueva_cantidad}`, {}
    );
  }
}

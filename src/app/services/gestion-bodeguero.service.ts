import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DespachoOut {
  id_despacho: number;
  estado: string;
  fecha: string;
  direccion: string;
}

export interface DetalleComprobanteOut {
  producto: string;
  cantidad: number;
  precio_unitario: number;
}

export interface StockProductoOut {
  sucursal_id_sucursal: number;
  producto_id_producto: number;
  stock: number;
  stock_minimo: number;
  categoria_id_categoria: number;
  desc_categoria: string;
  nombre_producto: string;
  desc_producto: string;
  imagen?: string;
}

export interface ActualizarEstadoIn {
  id_estado_despacho: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestionBodegueroService {

  private BASE_URL = 'http://localhost:8000/api/bodeguero';

  constructor(private http: HttpClient) { }

  listarDespachos(user_id: number): Observable<DespachoOut[]> {
    return this.http.get<DespachoOut[]>(`${this.BASE_URL}/despachos/?user_id=${user_id}`);
  }

  obtenerDetalleComprobante(user_id: number, id_comprobante: number): Observable<DetalleComprobanteOut[]> {
    return this.http.get<DetalleComprobanteOut[]>(
      `${this.BASE_URL}/detalle-comprobante/${id_comprobante}?user_id=${user_id}`
    );
  }

  asignarDespacho(user_id: number, id_despacho: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/asignar-despacho/${id_despacho}?user_id=${user_id}`, {});
  }

  actualizarEstadoDespacho(user_id: number, id_despacho: number, id_estado_despacho: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/estado-despacho/${id_despacho}?user_id=${user_id}`, {
      id_estado_despacho
    });
  }

  listarStock(user_id: number): Observable<StockProductoOut[]> {
    return this.http.get<StockProductoOut[]>(`${this.BASE_URL}/stock/?user_id=${user_id}`);
  }

  actualizarStock(user_id: number, producto_id_producto: number, nueva_cantidad: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/updatestock/${user_id}/${producto_id_producto}/${nueva_cantidad}`, {}
    );
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetalleCarrito {
  id_detalle: number;
  carrito_id_carrito: number;
  cantidad: number;
  subtotal: number;
  subtotal_temp: number;
  id_sucursal: number;
  id_producto: number;
  nombre_producto: string;
  imagen: string;              // <-- NUEVO
  precio_unitario: number;    // <-- NUEVO
}


export interface AgregarItemCarrito {
  id_producto: number;
  cantidad: number;
  id_sucursal: number;
}


export interface CompraRequest {
  id_carrito: number;
  tipo_comprobante: number;
  tipo_despacho: number;
  pago_confirmado: boolean;
} 

@Injectable({
  providedIn: 'root'
})
export class GestionaCarritoService {
  private BASE_URL = 'http://localhost:8000/api/ecommerce';

  constructor(private http: HttpClient) { }

  // Crear carrito
  crearCarrito(usuario_id: number): Observable<{ id_carrito: number }> {
    return this.http.post<{ id_carrito: number }>(`${this.BASE_URL}/carrito/${usuario_id}`, {});
  }

  // Obtener detalle del carrito
  obtenerDetalleCarrito(id_carrito: number): Observable<DetalleCarrito[]> {
    return this.http.get<DetalleCarrito[]>(`${this.BASE_URL}/detalle/${id_carrito}`);
  }

  // Agregar producto al carrito
  agregarProducto(id_carrito: number, data: AgregarItemCarrito): Observable<any> {
    return this.http.post(`${this.BASE_URL}/agregar/${id_carrito}`, data);
  }

  // Eliminar producto del carrito
  eliminarProducto(id_carrito: number, id_detalle: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/eliminar/${id_carrito}/${id_detalle}`);
  }

  // Obtener resumen del carrito
  obtenerResumen(id_carrito: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/resumen/${id_carrito}`);
  }

  // Procesar compra
  procesarCompra(data: CompraRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}/procesar-compra`, data);}

  desactivarCarrito(id_carrito: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/carrito/${id_carrito}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo base (ajústalo según tu backend)
export interface ProductFromSucursal {
  sucursal_id_sucursal: number;
  producto_id_producto: number;
  categoria_id_categoria: number;
  nombre_producto: string;
  desc_producto: string;
  desc_categoria: string;
  precio: number;
  stock: number;
  imagen: string;
}


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private BASE_URL = 'http://localhost:8000/api/tienda';

  constructor(private http: HttpClient) { }

  getCatalogoPorSucursal(
    sucursal_id: number,
    search?: string,
    category_id?: number
  ): Observable<ProductFromSucursal[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }
    if (category_id !== undefined && category_id !== null) {
      params = params.set('category_id', category_id.toString());
    }

    return this.http.get<ProductFromSucursal[]>(`${this.BASE_URL}/catalog/${sucursal_id}`, { params });
  }
}

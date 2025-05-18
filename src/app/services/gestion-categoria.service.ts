import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id_categoria: number;
  desc_categoria: string;
  estado_categoria: number;
}

export interface CategoriaCreate {
  desc_categoria: string;
  estado_categoria: number;
}

export interface CategoriaUpdate {
  desc_categoria?: string;
  estado_categoria?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestionCategoriaService {

  private BASE_URL = 'http://localhost:8000/crudcategoria/admin/categorias';

  constructor(private http: HttpClient) { }

  // 🔹 Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.BASE_URL);
  }

  // 🔹 Crear una nueva categoría
  crearCategoria(categoria: CategoriaCreate): Observable<any> {
    return this.http.post<any>(this.BASE_URL, categoria);
  }

  // 🔹 Actualizar una categoría existente
  actualizarCategoria(id: number, categoria: CategoriaUpdate): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, categoria);
  }

  // 🔹 Eliminar una categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}


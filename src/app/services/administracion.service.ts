import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  private API_URL = 'http://localhost:8000/crudusuario/admin';

  constructor(private http: HttpClient) { }

  // Crear cuenta de usuario administrador
  crearCuenta(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/crear_cuenta`, userData);
  }

  // Listar todos los usuarios
  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.API_URL}/listar_usuarios`);
  }

  // Eliminar usuario por correo
  eliminarUsuario(correo: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar_usuario/${correo}`);
  }

  // Editar usuario (requiere id del usuario y el id del que edita)
  editarUsuario(id_usuario: number, datos: any, id_actual: number): Observable<any> {
    const params = new HttpParams().set('id_actual', id_actual.toString());
    return this.http.put(`${this.API_URL}/editar_usuario/${id_usuario}`, datos, { params });
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {
  private API_URL = 'http://localhost:8000/api/user'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

/* register(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }
*/
  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { correo, password });
  }

  /*
  getUserInfo(id_usuario: number): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario);
    return this.http.get(`${this.API_URL}/info`, { params });
  }

  updateUser(id_usuario: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario);
    return this.http.put(`${this.API_URL}/update`, data, { params });
  }

  createTemporaryUser(): Observable<any> {
    return this.http.post(`${this.API_URL}/temporary`, {});
  }

  updateTemporaryUser(user_id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/temporary/${user_id}`, data);
  }

  getTemporaryUser(user_id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/temporary/${user_id}`);
  }

  deactivateTemporaryUser(user_id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/temporary/deactivate/${user_id}`, {});
  }

  /*
  sendRecoveryCode(correo: string): Observable<any> {
    const params = new HttpParams().set('correo', correo);
    return this.http.post(`${this.API_URL}/send-recovery-code`, null, { params });
  }

  verifyRecoveryCode(correo: string, codigo: string): Observable<any> {
    const params = new HttpParams()
      .set('correo', correo)
      .set('codigo', codigo);
    return this.http.post(`${this.API_URL}/verify-recovery-code`, null, { params });
  }

  recuperarContrasena(correo: string, codigo: string, nuevaPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('correo', correo)
      .set('codigo', codigo)
      .set('nueva_password', nuevaPassword);
    return this.http.post(`${this.API_URL}/recuperar/contrasena`, null, { params });
  }

  */
}


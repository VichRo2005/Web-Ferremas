// src/app/services/divisa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {
  private API_URL = 'https://v6.exchangerate-api.com/v6/71b06a8f5715a5a58c2b7b46/latest/CLP';

  constructor(private http: HttpClient) {}

  obtenerTasaCambio(): Observable<{ usd: number, eur: number }> {
    return this.http.get<any>(this.API_URL).pipe(
      map(data => ({
        usd: data.conversion_rates.USD,
        eur: data.conversion_rates.EUR
      })),
      catchError(() => of({ usd: 0, eur: 0 }))
    );
  }
}

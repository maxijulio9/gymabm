import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../model/prices';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private readonly apiUrl = 'http://localhost:3000/prices'; 

  constructor(private http: HttpClient) { }

  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl);
  }
  addPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(this.apiUrl, price);
  }

  updatePrice(price: Price): Observable<Price> {
    return this.http.put<Price>(`${this.apiUrl}/${price.id}`, price);
  }

  deletePrice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 

}

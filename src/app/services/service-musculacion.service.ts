import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Musculacion} from '../model/musculacion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceMusculacionService {

  private readonly baseURL = 'http://localhost:3000/musculacion'; 

  constructor(private http: HttpClient) {}


  loadMusculacionData(): Observable<Musculacion[]> {
    console.log('Loading Musculacion data from:', this.baseURL);
    return this.http.get<Musculacion[]>(this.baseURL)
  }

  updateMusculacionData(id: string): void {
    console.log('Musculacion data updated for ID:', id);
  }
}

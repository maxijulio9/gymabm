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

  addActivityService(activity: Musculacion): Observable<Musculacion>{
    console.log("work");

    return this.http.post<Musculacion>(this.baseURL, activity);

  }

  updateMusculacionData(activityActual: Musculacion): Observable<Musculacion> {

    console.log('Musculacion data updated for ID:', activityActual.id);
    return this.http.put<Musculacion>(`${this.baseURL}/${activityActual.id}`, activityActual);
  }

  deleteMusculacionData(id: string): Observable<void> {
    console.log('Deleting Musculacion data for ID:', id);
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}

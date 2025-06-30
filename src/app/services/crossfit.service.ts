import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crossfit } from '../model/crossfit';

@Injectable({
  providedIn: 'root'
})
export class CrossfitService {

  baseUrl = 'http://localhost:3000/crossfit'; 
  constructor(private http: HttpClient) { }

  loadCrossfitData(): Observable<Crossfit[]> {
    return this.http.get<Crossfit[]>(this.baseUrl);
  }
  addCrossfitActivity(activity: Crossfit): Observable<Crossfit> {
    return this.http.post<Crossfit>(this.baseUrl, activity);
  }

  updateCrossfitActivity(activity: Crossfit): Observable<Crossfit> {
    return this.http.put<Crossfit>(`${this.baseUrl}/${activity.id}`, activity);
  }

  deleteCrossfitActivity(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}

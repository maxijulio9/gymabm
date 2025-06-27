import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly baseURL = 'http://localhost:3000/people';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]>{
    console.log('Loading people data from:', this.baseURL);
    return this.http.get<Person[]>(this.baseURL);

  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseURL, person);
  }

  updatePerson(person: Person): Observable<Person> {
    console.log('Updating person data for ID:', person.id);
    return this.http.put<Person>(`${this.baseURL}/${person.id}`, person);
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}

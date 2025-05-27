import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private API = 'http://192.168.43.42:8000/api'; // ← adapte ton IP backend ici

  constructor(private http: HttpClient) {}

  getTuteurs() {
    return this.http.get(`${this.API}/tutors`);
  }

  searchTuteurs(query: string) {
    return this.http.get(`${this.API}/search-tutors?q=${query}`);
  }

  getTuteur(id: number) {
    return this.http.get(`${this.API}/tutors/${id}`);
  }
}

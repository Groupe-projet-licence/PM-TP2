import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://192.168.43.42:8000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { 
    email: string,
     password: string }):
     Observable<any> {
    return this.http.post(`${apiUrl}/login`, credentials);
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string; // student ou tutor
  }): Observable<any> {
    return this.http.post(`${apiUrl}/register`, data);
  }


  getProfile(): Observable<any> {
    return this.http.get(`${apiUrl}/profile`);
  }
}

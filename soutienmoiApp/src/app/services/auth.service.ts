import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par votre URL Laravel

  async login(email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/login`, { email, password });
    return response.data;
  }

  async register(userData: any) {
    const response = await axios.post(`${this.apiUrl}/register`, userData);
    return response.data;
  }

  async getProfile(token: string) {
    const response = await axios.get(`${this.apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async logout(token: string) {
    await axios.post(`${this.apiUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
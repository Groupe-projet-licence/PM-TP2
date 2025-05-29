import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = environment.baseUrl;      // Exemple: 'http://192.168.43.42:8000'
  private API_URL = environment.apiUrl;   // Exemple: 'http://192.168.43.42:8000/api'

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  // Inscription : demande d'abord le cookie CSRF, puis envoie la requête
  async register(data: any): Promise<any> {
    try {
      await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
      const response = await firstValueFrom(
        this.http.post(`${this.API_URL}/register`, data, { withCredentials: true })
      );
      return response;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  }

  // Connexion : même principe
  async login(data: any): Promise<any> {
    try {
      await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
      const response = await firstValueFrom(
        this.http.post(`${this.API_URL}/login`, data, { withCredentials: true })
      );
      return response;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  }

  logout() {
    return this.storage.remove('token');
  }

  setToken(token: string) {
    return this.storage.set('token', token);
  }

  getToken() {
    return this.storage.get('token');
  }

  async getUser(): Promise<any> {
    try {
      const token = await this.getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const response = await firstValueFrom(
        this.http.get(`${this.API_URL}/user`, {
          headers,
          withCredentials: true
        })
      );
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    }
  }
}

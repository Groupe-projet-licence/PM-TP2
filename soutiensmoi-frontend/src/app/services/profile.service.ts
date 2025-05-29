import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API = environment.baseUrl;
  private API_URL = `${this.API}/api`;

  constructor(private http: HttpClient) {}

  async getProfile(id: number): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));

    return await firstValueFrom(
      this.http.get(`${this.API_URL}/users/${id}`, { withCredentials: true })
    );
  }

  async updateProfile(id: number, data: any): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));

    return await firstValueFrom(
      this.http.put(`${this.API_URL}/users/${id}`, data, { withCredentials: true })
    );
  }
}

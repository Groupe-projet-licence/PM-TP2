import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqNewService {
  private API = environment.baseUrl;
  private API_URL = `${this.API}/api`;

  constructor(private http: HttpClient) {}

  async createFaqPost(data: any): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));

    return await firstValueFrom(
      this.http.post(`${this.API_URL}/faq-posts`, data, {
        withCredentials: true
      })
    );
  }
}

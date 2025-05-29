import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  async getUser(id: number): Promise<any> {
    return await firstValueFrom(
      this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true })
    );
  }

  async getAllUsers(): Promise<any> {
    return await firstValueFrom(
      this.http.get(this.apiUrl, { withCredentials: true })
    );
  }

  async searchUsers(query: string): Promise<any> {
    return await firstValueFrom(
      this.http.get(`${environment.apiUrl}/search?q=${query}`, { withCredentials: true })
    );
  }
}

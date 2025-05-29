import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl =` ${environment.apiUrl}/users`; // ou une route dédiée à la recherche

  constructor(private http: HttpClient) {}

  async search(query: string): Promise<any> {
    const params = new HttpParams().set('q', query);
    return await firstValueFrom(
      this.http.get(this.apiUrl, { params, withCredentials: true })
    );
  }
}

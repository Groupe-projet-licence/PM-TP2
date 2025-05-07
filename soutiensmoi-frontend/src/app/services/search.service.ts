import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl ='http://192.168.43.42:8000/api';  // Get apiUrl from environment

  constructor(private http: HttpClient) {}

  search(subject: string, level: string): Observable<any[]> {
    const params = new HttpParams()
      .set('subject', subject)
      .set('level', level);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}

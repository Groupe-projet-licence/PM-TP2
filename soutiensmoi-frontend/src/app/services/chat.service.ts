import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = environment.apiUrl; // Access apiUrl from the environment object

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat`);
  }

  sendMessage(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, { text });
  }
}

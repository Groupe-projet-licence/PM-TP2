import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ChatService {
  private API = 'http://192.168.43.42/api'; // Access apiUrl from the environment object

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/chat`);
  }

  sendMessage(text: string): Observable<any> {
    return this.http.post(`${this.API}/chat`, { text });
  }
}

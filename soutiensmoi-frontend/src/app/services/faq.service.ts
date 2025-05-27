import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class FaqService {
   private API = 'http://192.168.43.42/api'; // Access apiUrl from the environment object

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/faqs`);
  }
}

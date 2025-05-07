import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class FaqService {
  private apiUrl = environment.apiUrl; // Access apiUrl from the environment object

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/faqs`);
  }
}

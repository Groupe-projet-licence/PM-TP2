import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface FeedbackPayload {
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  send(payload: FeedbackPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedback`, payload); // Assuming your API endpoint is /feedback and you're using POST
  }
}

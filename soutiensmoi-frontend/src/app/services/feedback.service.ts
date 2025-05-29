import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/feedbacks`;

  constructor(private http: HttpClient) {}

  async getAll(): Promise<any> {
    return await firstValueFrom(
      this.http.get(this.apiUrl, { withCredentials: true })
    );
  }

  async submitFeedback(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post(this.apiUrl, data, { withCredentials: true })
    );
  }

  async deleteFeedback(id: number): Promise<any> {
    return await firstValueFrom(
      this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true })
    );
  }
}

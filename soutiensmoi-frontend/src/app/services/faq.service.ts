import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getAllFaqs(): Promise<any> {
    return await firstValueFrom(
      this.http.get(`${this.apiUrl}/faq-posts`, { withCredentials: true })
    );
  }

  async getFaq(id: number): Promise<any> {
    return await firstValueFrom(
      this.http.get(`${this.apiUrl}/faq-posts/${id}`, { withCredentials: true })
    );
  }

  async createFaq(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/faq-posts, data`, { withCredentials: true })
    );
  }

  async submitResponse(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/faq-reponses`, data, { withCredentials: true })
    );
  }

  async voteResponse(responseId: number): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/faq-reponses/${responseId}/vote`, {}, { withCredentials: true })
    );
  }
}

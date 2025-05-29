import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqDetailService {
  private API = environment.baseUrl;
  private API_URL = `${this.API}/api`;

  constructor(private http: HttpClient) {}

  async getFaqPost(id: number): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
    return await firstValueFrom(
      this.http.get(`${this.API_URL}/faq-posts/${id}`, { withCredentials: true })
    );
  }

  async postResponse(faqId: number, data: any): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
    return await firstValueFrom(
      this.http.post(`${this.API_URL}/faq-responses`, { ...data, faq_post_id: faqId }, { withCredentials: true })
    );
  }

  async voteResponse(responseId: number, value: number): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
    return await firstValueFrom(
      this.http.post(`${this.API_URL}/faq-responses/${responseId}/vote`, { value }, { withCredentials: true })
    );
  }

  async deleteResponse(responseId: number): Promise<any> {
    await firstValueFrom(this.http.get(`${this.API}/sanctum/csrf-cookie`, { withCredentials: true }));
    return await firstValueFrom(
      this.http.delete(`${this.API_URL}/faq-responses/${responseId}`, { withCredentials: true })
    );
  }
}

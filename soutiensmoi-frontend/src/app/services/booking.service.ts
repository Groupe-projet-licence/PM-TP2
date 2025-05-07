import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Assure-toi que ce chemin est correct



@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = environment.apiUrl; // Store apiUrl in a private property

  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data);
  }

  getUserBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }
}






import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule to imports
})
export class BookingPage {
  subject = '';
  date = '';
  message = '';
  responseMessage = '';

  constructor(private bookingService: BookingService) {}

  bookTutor() {
    const bookingData = {
      subject: this.subject,
      date: this.date,
      message: this.message
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: res => {
        this.responseMessage = 'Réservation envoyée avec succès !';
      },
      error: err => {
        this.responseMessage = 'Erreur lors de la réservation.';
        console.error(err);
      }
    });
  }
}

import { Component } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule to imports
})
export class FeedbackPage {
  message = '';

  constructor(private feedbackService: FeedbackService) { }

  sendFeedback() {
    if (!this.message) return;
    this.feedbackService.send({ text: this.message }).subscribe(
      (res: any) => console.log('Feedback sent', res),
      (err: any) => console.error('Feedback error', err)
    );
  }
}

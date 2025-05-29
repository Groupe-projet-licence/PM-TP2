import { Component } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],

})
export class FeedbackPage {
  message = '';

  constructor(private feedbackService: FeedbackService) { }

  sendFeedback() {
  if (!this.message) return;

  this.feedbackService.submitFeedback({ text: this.message })
    .then(res => console.log('Feedback sent', res))
    .catch(err => console.error('Feedback error', err));
}
}

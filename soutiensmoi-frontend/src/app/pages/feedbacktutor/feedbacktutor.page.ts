import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  rating: number = 4; // note par défaut
  commentaire: string = '';

  setRating(value: number) {
    this.rating = value;
  }

  envoyerFeedback() {
    console.log('Note :', this.rating);
    console.log('Commentaire :', this.commentaire);
    // Tu peux ici appeler ton API Laravel
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage {
  constructor(private router: Router) {}

  goToChat() {
    this.router.navigate(['/chat']); // Crée cette page plus tard si elle n’existe pas
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  questions: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.chargerQuestions();
  }

  chargerQuestions() {
    this.http.get('http://localhost:8000/api/faq-posts')
      .subscribe((res: any) => this.questions = res);
  }

  voirQuestion(id: number) {
    this.router.navigate(['/faq-detail', id]);
  }

  poserQuestion() {
    this.router.navigate(['/faq-new']);
  }
}

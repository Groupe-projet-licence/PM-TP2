import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.page.html',
  styleUrls: ['./faq-detail.page.scss'],
})
export class FaqDetailPage implements OnInit {
  question: any = {};
  reponses: any[] = [];
  reponse = '';
  userId = 1; // à adapter

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/faq-posts/${id}`).subscribe((res: any) => {
      this.question = res;
      this.reponses = res.reponses;
    });
  }

  envoyerReponse() {
    this.http.post('http://localhost:8000/api/faq-reponses', {
      faq_post_id: this.question.id,
      user_id: this.userId,
      contenu: this.reponse
    }).subscribe(() => {
      this.reponse = '';
      this.ngOnInit(); // reload
    });
  }

  voter(rep: any, valeur: number) {
    this.http.post(`http://localhost:8000/api/faq-reponses/${rep.id}/vote`, { vote: valeur })
      .subscribe(() => this.ngOnInit());
  }
}

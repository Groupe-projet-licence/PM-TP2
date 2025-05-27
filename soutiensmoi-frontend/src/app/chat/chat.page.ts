import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  destinataireId: number;
  userId = 1; // à remplacer dynamiquement
  message = '';
  messages: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.destinataireId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadMessages();
    setInterval(() => this.loadMessages(), 5000); // polling simple
  }

  loadMessages() {
    this.http.get(`http://localhost:8000/api/messages?user1=${this.userId}&user2=${this.destinataireId}`)
      .subscribe((res: any) => this.messages = res);
  }

  envoyer() {
    const payload = {
      expediteur_id: this.userId,
      destinataire_id: this.destinataireId,
      texte: this.message
    };

    this.http.post('http://localhost:8000/api/messages', payload)
      .subscribe(() => {
        this.message = '';
        this.loadMessages();
      });
  }
}

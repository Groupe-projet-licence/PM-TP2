import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  role: string;
  average_rating: number;
}

interface Skill {
  id: number;
  name: string;
  level: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  sender: User;
  receiver: User;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule],
})
export class HomePage implements OnInit, OnDestroy {
  currentUser: User | null = null;
  selectedSkillId: number | null = null;
  receiverId: number | null = null;
  content: string = '';
  rating: number | null = null;
  users: User[] = [];
  skills: Skill[] = [];
  availableReceivers: User[] = [];
  messages: Message[] = [];
  private pollingSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(userData);
    this.loadUsers();
    this.loadSkills();
    this.pollingSubscription = interval(5000).subscribe(() => {
      if (this.currentUser && this.receiverId) {
        this.loadMessages();
      }
    });
    this.onUserChange();
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:8000/api/users').subscribe((users) => {
      this.users = users;
    });
  }

  loadSkills() {
    this.http.get<Skill[]>('http://localhost:8000/api/skills').subscribe((skills) => {
      this.skills = skills;
    });
  }

  onUserChange() {
    this.selectedSkillId = null;
    this.receiverId = null;
    this.availableReceivers = [];
    this.messages = [];
    this.rating = null;
    if (this.currentUser?.role === 'tutor') {
      this.loadStudents();
    }
  }

  onSkillChange() {
    if (this.currentUser?.role === 'student' && this.selectedSkillId) {
      this.http
        .get<User[]>(`http://localhost:8000/api/users-by-skill?skill_id=${this.selectedSkillId}`)
        .subscribe((users) => {
          this.availableReceivers = users.filter((user) => user.id !== this.currentUser?.id);
          this.receiverId = null;
          this.messages = [];
          this.rating = null;
        });
    } else {
      this.availableReceivers = [];
      this.receiverId = null;
      this.messages = [];
      this.rating = null;
    }
  }

  loadStudents() {
    this.http.get<User[]>('http://localhost:8000/api/students').subscribe((students) => {
      this.availableReceivers = students.filter((user) => user.id !== this.currentUser?.id);
      this.receiverId = null;
      this.messages = [];
      this.rating = null;
    });
  }

  sendMessage() {
    if (this.content.trim() && this.currentUser && this.receiverId) {
      this.http
        .post('http://localhost:8000/api/messages', {
          sender_id: this.currentUser.id,
          receiver_id: this.receiverId,
          content: this.content,
        })
        .subscribe(() => {
          this.content = '';
          this.loadMessages();
        });
    }
  }

  loadMessages() {
    if (this.currentUser && this.receiverId) {
      this.http
        .get<Message[]>(
          `http://localhost:8000/api/messages?sender_id=${this.currentUser.id}&receiver_id=${this.receiverId}`
        )
        .subscribe((messages) => {
          this.messages = messages;
        });
    }
  }

  submitRating() {
    if (this.currentUser && this.receiverId && this.rating && this.currentUser.role === 'student') {
      this.http
        .post('http://localhost:8000/api/ratings', {
          student_id: this.currentUser.id,
          tutor_id: this.receiverId,
          rating: this.rating,
        })
        .subscribe({
          next: () => {
            this.rating = null;
            alert('Note enregistrée avec succès !');
          },
          error: (err) => {
            alert(err.error.error || 'Note enregistrer avec succes votre demande est en cours de traitement');
          },
        });
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
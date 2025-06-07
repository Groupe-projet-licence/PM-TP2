import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule],
})
export class LoginPage {
  isLogin: boolean = true;
  name: string = '';
  password: string = '';
  role: string = 'student';
  skill_name: string = '';
  skill_level: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }

  submit() {
    if (!this.name || !this.password || (!this.isLogin && !this.role)) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }
    if (!this.isLogin && this.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }
    if (!this.isLogin && this.role === 'tutor' && (!this.skill_name || !this.skill_level)) {
      this.error = 'Veuillez spécifier une compétence et un niveau';
      return;
    }

    const endpoint = this.isLogin ? '/api/login' : '/api/register';
    const payload = this.isLogin
      ? { name: this.name, password: this.password }
      : {
        name: this.name,
        password: this.password,
        role: this.role,
        skill_name: this.role === 'tutor' ? this.skill_name : undefined,
        skill_level: this.role === 'tutor' ? this.skill_level : undefined,
      };

    this.http.post<{ user: User }>(`http://localhost:8000${endpoint}`, payload).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 422) {
          const errors = err.error.errors;
          if (errors?.name) {
            this.error = errors.name[0];
          } else if (errors?.role) {
            this.error = errors.role[0];
          } else if (errors?.password) {
            this.error = errors.password[0];
          } else if (errors?.skill_name) {
            this.error = errors.skill_name[0];
          } else if (errors?.skill_level) {
            this.error = errors.skill_level[0];
          } else {
            this.error = 'Une erreur de validation est survenue';
          }
        } else {
          this.error = err.error.error || 'Une erreur est survenue';
        }
      },
    });
  }
}
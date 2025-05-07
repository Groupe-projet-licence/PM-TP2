import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule to imports
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}

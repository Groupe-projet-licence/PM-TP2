import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule to imports
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';
  role = '';
  niveau='';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      role: this.role,
      niveau: this.niveau
    };

    this.authService.register(data).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error('Registration failed', err);
      }
    });
  }
}

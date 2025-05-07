import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule to imports
})
export class ProfilePage implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: data => {
        this.user = data.user;
      },
      error: err => {
        console.error('Erreur lors du chargement du profil', err);
      }
    });
  }
}

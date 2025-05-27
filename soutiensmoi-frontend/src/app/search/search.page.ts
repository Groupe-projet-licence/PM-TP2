import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule,RouterModule],
})
export class SearchPage {
  query = '';
  tuteurs: any[] = [];

  constructor(private userService: UserService, private navCtrl: NavController) {}

  chercher() {
    this.userService.searchTuteurs(this.query).subscribe((res: any) => {
      this.tuteurs = res;
    });
  }

  voirProfil(id: number) {
    this.navCtrl.navigateForward(`/profile/${id}`);
  }

  getNoteMoyenne(feedbacks: any[]): string {
  if (!feedbacks.length) return 'Aucune';
  const total = feedbacks.reduce((acc, f) => acc + f.note, 0);
  return (total / feedbacks.length).toFixed(1);
}

getNomSkills(tuteur: any): string {
  return (tuteur.skills || []).map((s: any) => s.name).join(', ');
}
}

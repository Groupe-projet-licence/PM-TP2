import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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

 async chercher() {
  try {
    const res: any = await this.userService.searchUsers(this.query);  // PAS de firstValueFrom ici
    this.tuteurs = res;
  } catch (error) {
    console.error('Erreur lors de la recherche de tuteurs :', error);
  }
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

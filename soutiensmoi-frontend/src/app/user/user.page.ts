import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
   standalone: true,
 imports: [CommonModule, FormsModule, IonicModule,RouterModule],
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  tuteurs: any[] = [];
  query: string = '';

  constructor(
    private userService: UserService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.getAllTuteurs();
  }

  async getAllTuteurs() {
    try {
      this.tuteurs = await this.userService.getAllUsers();
    } catch (error) {
      console.error('Erreur lors du chargement des tuteurs :', error);
    }
  }

  async rechercher() {
    if (this.query.trim() === '') {
      this.getAllTuteurs();
      return;
    }

    try {
      this.tuteurs = await this.userService.searchUsers(this.query);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  }

  voirProfil(id: number) {
    this.navCtrl.navigateForward(`/profile/${id}`);
  }

  getMoyenne(feedbacks: any[]): string {
    if (!feedbacks || feedbacks.length === 0) return 'Aucune note';
    const somme = feedbacks.reduce((total, fb) => total + fb.note, 0);
    return (somme / feedbacks.length).toFixed(1);
  }

  getSkillsNames(skills: any[]): string {
  if (!skills || skills.length === 0) {
    return 'Aucune compétence renseignée.';
  }
  return skills.map(s => s.name).join(', ');
}
}

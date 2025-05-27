import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-faq-new',
  templateUrl: './faq-new.page.html',
  styleUrls: ['./faq-new.page.scss'],
})
export class FaqNewPage {
  question = {
    titre: '',
    contenu: '',
    user_id: 0
  };

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private auth: AuthService
  ) {}

  async publier() {
    try {
      const user = await this.auth.getUser();
      this.question.user_id = user.id;

      await this.http.post('http://192.168.43.42:8000/api/faq-posts', this.question).toPromise();

      const toast = await this.toastCtrl.create({
        message: 'Question publiée avec succès',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.navCtrl.navigateBack('/faq');
    } catch (error) {
      console.error(error);
      const toast = await this.toastCtrl.create({
        message: 'Échec de l’envoi',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}

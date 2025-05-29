import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class RegisterPage {
  form = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'etudiant',
    avatar: '',
    bio: ''
  };

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async register() {
    try {
      const res = await this.auth.register(this.form);
      await this.auth.setToken(res.token);
      this.showToast('Inscription réussie !');
      this.navCtrl.navigateRoot('/home');
    } catch(err: any) {
      const message = err?.error?.message || 'Erreur inconnue';
      this.showToast('Erreur : ' + message, 'danger');
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}

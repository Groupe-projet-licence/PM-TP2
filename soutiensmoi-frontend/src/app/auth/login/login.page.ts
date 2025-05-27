import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = { email: '', password: '' };

  constructor(private auth: AuthService, private navCtrl: NavController) {}

  async login() {
    try {
      const res: any = await this.auth.login(this.form);
      await this.auth.setToken(res.token);
      this.navCtrl.navigateRoot('/home');
    } catch (err: any) {
      alert('Email ou mot de passe invalide');
    }
  }
}

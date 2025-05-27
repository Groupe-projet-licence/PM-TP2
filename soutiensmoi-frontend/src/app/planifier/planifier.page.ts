import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-planifier',
  templateUrl: './planifier.page.html',
  styleUrls: ['./planifier.page.scss'],
})
export class PlanifierPage implements OnInit {
  tuteurId: number;
  form = {
    matiere: '',
    date: '',
    heure: '',
    mode: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    this.tuteurId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {}

  async planifier() {
    const studentId = 1; // à remplacer par l'utilisateur connecté

    const data = {
      student_id: studentId,
      tutor_id: this.tuteurId,
      ...this.form
    };

    this.http.post('http://localhost:8000/api/sessions', data)
      .subscribe(async res => {
        const toast = await this.toastCtrl.create({
          message: 'Séance planifiée avec succès',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.navCtrl.navigateRoot('/home');
      });
  }
}
